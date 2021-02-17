import fs from "fs";
import path from "path";
import keytar from "keytar";
import { app, dialog, BrowserWindow } from "electron";
import { getWikiInfo } from "./wikiDetect.js";

// TODO hook into node project variable REFERENCE TWICE
const projectName = "MediaWikiAGE";

/// Stores settings for the program.
///
/// Structure:
///  - wikis: string -> WikiObject
///     Maps wiki names to wiki data objects. This is only for standalone wikis that aren't part of a farm.
///  - farms: string -> FarmObject
///     Maps farm names to farm data objects. The two separate objects for wikis and farms are chosen as a way
///     to resolve wiki-farm naming conflicts.
///
/// Note: wiki objects and farm objects collectively are known as "auth system" objects due to their identical
/// `accounts` interfaces.
///
/// WikiObject structure:
///  - url: string
///     A string that is expected to be a valid URL to the wiki. If it ends with `/api.php`, it is assumed to
///     lead to that endpoint. Otherwise, it is assumed to lead to a top-level page (not a subpage), preferably
///     the wiki's main page. In the latter case, should the actual api.php URL be needed, MAGE will try to
///     infer it by deriving the URL for Special:Version and reading its HTML source to find the api.php link.
///     That way no HTTP requests are made until the user runs a task that requires accessing the wiki's API.
///  - accounts: string -> AccountObject
///     Maps account names to account data objects.
///
/// FarmObject structure:
///  - wikis: string -> WikiObject
///     Like with the top-level `wikis` map, maps wiki names to wiki data objects. These objects, however,
///     aren't expected to have the `accounts` field because accounts on wiki farms are assumed to be centralized.
///  - accounts: string -> AccountObject
///     Maps account names to account data objects.
///
/// AccountObject structure:
///  - botPasswords: string -> BotPasswordObject
///     Maps bot password names to bot password data objects.
///
/// BotPasswordObject structure:
///  (Currently does not hold any data.)
let settings = defaultSettings();

/// Returns a blank settings object. Intentionally a function to prevent changes to the default settings.
function defaultSettings() {
  return {
    "wikis": {},
    "farms": {}
  };
};

/// Returns a path to the settings file.
function getSettingsPath() {
  return path.join(app.getPath("userData"), "mage_settings.json");
};

/// Rewrites the settings file with the data stored in `settings`.
function saveSettings() {
  fs.writeFileSync(getSettingsPath(), JSON.stringify(settings, null, 4));
};

/// Resets settings to default, also offers to delete all keytar passwords.
function overwriteSettings() {
  console.warn("Resetting the configuration file to default.");
  settings = defaultSettings();
  saveSettings();

  function offerKeytarReset(browserWindow) {
    keytar.findCredentials(projectName).then( creds => {
      // No need to ask whether to delete nonexistent passwords.
      // In fact, that would confuse every new user.
      if (creds.length === 0) {
        return;
      }

      dialog.showMessageBox(browserWindow, {
        type: "warning",
        title: "MAGE: Configuration Reset",
        message: "Resetting MAGE configuration. Do you want to delete all stored bot passwords?",
        buttons: ["Keep passwords", "Delete passwords"],
        defaultId: 0,
        cancelId: 0
      }).then( (resolved) => {
        if (resolved.response === 1) {
          console.warn("Warning: deleting all stored passwords.");
          creds.forEach(obj => keytar.deletePassword(projectName, obj.account));
        }
      });
    });

  };

  // Wipe keytar in case the settings file is corrupted, deleted, or missing. The installation is assumed to be new, or
  // the account information is assumed to be irrecoverable or not needed to be recovered.
  // Implementation notes:
  //  - This dialog offers a destructive action, and so it is intentionally modal.
  //  - Dialogs can't be opened until the app is ready, but what's more, they can only be modal if bound to a browser window.
  //  - Assumes it's always sensible to block either the focused window, or window #0.
  if (app.isReady()) {
    offerKeytarReset(BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0]);
  } else {
    app.once("browser-window-created", (event, browserWindow) => {
      offerKeytarReset(browserWindow);
    })
  }
};

/// Loads settings from the file, resetting them in case of an error.
function loadSettings() {
  try {
    settings = JSON.parse(fs.readFileSync(getSettingsPath()));
  } catch (err) {
    if (err.name === "SyntaxError") {
      console.error("Settings file contains invalid JSON.");
    } else {
      // Assume the only error other than a syntax error is a "file not found" error.
      console.error(`Could not load the configuration file: ${err.name}: ${err.message}.`);
    }
    overwriteSettings();
  }
};

// The following functions are for lower-level settings object manipulation. They are not intended for
// standalone use; they would typically be used in functions that implement specific higher-level operations.

/// Ensures the settings object has a wiki object for name `wikiName` and returns that wiki object.
function checkWikiSettings(wikiName) {
  settings.wikis[wikiName] = settings.wikis[wikiName] || {};
  return settings.wikis[wikiName];
};

/// Ensures the settings object has a wiki farm object for name `farmName` and returns that wiki farm object.
function checkFarmSettings(farmName) {
  settings.farms[farmName] = settings.farms[farmName] || {};
  return settings.farms[farmName];
};

/// Ensures the auth system object `authSettings` has an account object for account `accountName` and
/// returns the account object.
function checkAccountSettings(authSettings, accountName) {
  authSettings.accounts = authSettings.accounts || {};
  authSettings.accounts[accountName] = authSettings.accounts[accountName] || {};
  return authSettings.accounts[accountName];
};

/// Ensures the account object `accountSettings` has a bot password object for bot password `botPasswordName`
/// and returns the bot password object.
function checkAccountPasswordSettings(accountSettings, botPasswordName) {
  accountSettings.botPasswords = accountSettings.botPasswords || {};
  accountSettings.botPasswords[botPasswordName] = accountSettings.botPasswords[botPasswordName] || {};
  return accountSettings.botPasswords[botPasswordName];
};

/// Ensures the wiki farm object `farmSettings` has a wiki object for wiki `wikiName` and returns that
/// wiki object.
function checkFarmWikiSettings(farmSettings, wikiName) {
  farmSettings.wikis = farmSettings.wikis || {};
  farmSettings.wikis[wikiName] = farmSettings.wikis[wikiName] || {};
  return farmSettings.wikis[wikiName];
};

/// Given a string `url` that must contain a valid URL, attempts to derive a "placeholder" name for that
/// wiki. Returns a string with that name.
function getWikiNameFromUrl(url) {
  const urlObject = new URL(url);
  const host = urlObject.host;

  // Sort of a hack to better support non-English Fandom wiki URLs.
  // Wikipedias in different languages have different hostnames (ru.wikipedia.org, en.wikipedia.org),
  // but Fandom wikis in different languages have the same hostname and different path
  // (community.fandom.com/wiki/Main Page; community.fandom.com/ru/wiki/Main Page)
  let langSuffix = "";
  let pathMatch = urlObject.pathname.match(/^\/([^\/]+?)\/wiki/);
  if (pathMatch) {
    langSuffix = ` [${pathMatch[1]}]`; // [ru]
  }

  return `${host}${langSuffix}`;
};

/// Derives a keytar password key for bot password named `botPasswordName`, associated with account `accountName`
/// on `authSystemName`. Returns the key as a string.
function deriveKeytarKey(authSystemName, accountName, botPasswordName) {
  return `${authSystemName}|${accountName}|${botPasswordName}`;
};

// The following classes are intended to wrap over most low-level settings operations, thereby becoming
// the library's higher-level layer.

/// The "auth system" is a somewhat synthetic concept, a generalization of standalone wikis and
/// wiki farms as a context where a set of credentials may apply.
/// This class should be treated as abstract.
class AuthSystem {
  /// Creates a new auth system with name `name`.
  constructor(name) {
    this.name = name;
  }
  /// Implements common operations performed when adding a bot password.
  addBotPassword(accountName, botPasswordName, botPassword) {
    const keytarKey = deriveKeytarKey(this.name, accountName, botPasswordName);
    keytar.setPassword(projectName, keytarKey, botPassword);
  }
}

/// Instances of this class represent wikis, whether standalone ones or those part of wiki farms.
class Wiki extends AuthSystem {
  /// Creates a new wiki called `name`. If `parentFarm` is provided, it must be the Farm object for that farm.
  /// Parent farms are used to defer to the farm for centralized settings.
  constructor(name, parentFarm) {
    super(name);
    this.parentFarm = parentFarm;
  }
  /// Adds a bot password for this wiki, or for the farm this wiki is part of.
  addBotPassword(accountName, botPasswordName, botPassword) {
    if (this.parentFarm) {
      this.parentFarm.addBotPassword(accountName, botPasswordName, botPassword);
    } else {
      super.addBotPassword(accountName, botPasswordName, botPassword);

      const wikiSettings = checkWikiSettings(this.name);
      const wikiAccountSettings = checkAccountSettings(wikiSettings, accountName);
      const wikiAccountPasswordSettings = checkAccountPasswordSettings(wikiAccountSettings, botPasswordName);

      saveSettings();
    }
  }
  /// Sets the URL for the wiki in the settings. `wikiUrl` is expected to be a string with the URL, not a URL object.
  setUrl(wikiUrl) {
    const wikiSettings = checkWikiSettings(this.name);
    wikiSettings.url = wikiUrl;

    saveSettings();
  }
}

/// Instances of this class represent wiki farms.
class Farm extends AuthSystem {
  /// Creates a new Farm object called `name`.
  constructor(name) {
    super(name);
  }
  /// Adds a new password applicable to all wikis of the farm.
  addBotPassword(accountName, botPasswordName, botPassword) {
    super.addBotPassword(accountName, botPasswordName, botPassword);

    const farmSettings = checkFarmSettings(this.name);
    const farmAccountSettings = checkAccountSettings(farmSettings, accountName);
    const farmAccountPasswordSettings = checkAccountPasswordSettings(farmAccountSettings, botPasswordName);

    saveSettings();
  }
  /// Adds a list of wikis that are part of this farm, given an array `url` that contains strings that point
  /// to each individual wiki.
  addWikisFromUrls(urls) {
    const farmSettings = checkFarmSettings(this.name);
    for (const url of urls) {
      const wikiSettings = checkFarmWikiSettings(farmSettings, getWikiNameFromUrl(url));
      wikiSettings.url = url;
    }

    saveSettings();
  }
}

export default {
  loadSettings: loadSettings,

  /// Returns the list of all known auth system in the format usable by the login form.
  /// Structures in the array have the following fields:
  ///  - name (string): the name of the wiki or farm
  ///  - isFarm (boolean?): `true` if it's a farm
  ///  - id (integer): the index of the auth system, starting from 1.
  /// Farms are listed first (in an unspecified order), followed by wikis (also in an unspecified order).
  getAuthSystemList() {
    const list = [];
    let id = 1;

    for (const farmName in settings.farms) {
      list.push({
        name: farmName,
        isFarm: true,
        id: id
      });
      id += 1;
    }

    for (const wikiName in settings.wikis) {
      list.push({
        name: wikiName,
        id: id
      });
      id += 1;
    }

    return list;
  },

  /// Adds a password specified in `botPasswordData` for the auth system specified in `authSystemData`.
  ///
  /// authSystemData fields:
  ///  - isFarm (boolean?): true if it's a farm, otherwise it's a standalone wiki
  ///  - name (string): the name of the auth system
  /// botPasswordData fields:
  ///  - accountName (string): the name of the account the bot password is associated with
  ///  - botPasswordName (string): the name of the bot password
  ///  - botPassword (string): the bot password (obviously)
  addBotPasswordForAuthSystem(authSystemData, botPasswordData) {
    const authSystemObject = authSystemData.isFarm
      ? new Farm(authSystemData.name)
      : new Wiki(authSystemData.name);

    authSystemObject.addBotPassword(botPasswordData.accountName, botPasswordData.botPasswordName, botPasswordData.botPassword);
  },

  /// Initializes the settings for a standalone wiki named `wikiName` with the URL `wikiUrl`.
  createStandaloneWikiWithUrl(wikiName, wikiUrl) {
    const wiki = new Wiki(wikiName);
    wiki.setUrl(wikiUrl);
  },

  /// Initializes the settings for a wiki farm named `farmName` with wiki URLs in the array `wikiUrls`.
  createWikiFarmWithUrls(farmName, wikiUrls) {
    const farm = new Farm(farmName);
    farm.addWikisFromUrls(wikiUrls);
  }
};
