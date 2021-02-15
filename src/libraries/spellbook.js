import fs from "fs";
import path from "path";
import Bot from "@sidemen19/mediawiki.js";
import keytar from "keytar";
import { app, dialog, BrowserWindow } from "electron";
import { getWikiInfo } from "./wikiDetect.js";

// TODO hook into node project variable REFERENCE TWICE
const projectName = "MediaWikiAGE";

let settings = defaultSettings();
let settingFileError = false;

function defaultSettings() {
  return {
    "wikis": {},
    "farms": {}
  };
};

function getSettingsPath() {
  return path.join(app.getPath("userData"), "mage_settings.json");
};

function saveSettings() {
  fs.writeFileSync(getSettingsPath(), JSON.stringify(settings, null, 4));
};

function overwriteSettings() {
  console.warn("Resetting the configuration file to default.");
  settings = defaultSettings();
  saveSettings();

  function offerKeytarReset(browserWindow) {
    keytar.findCredentials(projectName).then( creds => {
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

function checkWikiSettings(wikiName) {
  settings.wikis[wikiName] = settings.wikis[wikiName] || {};
  return settings.wikis[wikiName];
};

function checkFarmSettings(farmName) {
  settings.farms[farmName] = settings.farms[farmName] || {};
  return settings.farms[farmName];
};

function checkAccountSettings(authSettings, accountName) {
  authSettings.accounts = authSettings.accounts || {};
  authSettings.accounts[accountName] = authSettings.accounts[accountName] || {};
  return authSettings.accounts[accountName];
};

function checkAccountPasswordSettings(accountSettings, botPasswordName) {
  accountSettings.botPasswords = accountSettings.botPasswords || {};
  accountSettings.botPasswords[botPasswordName] = accountSettings.botPasswords[botPasswordName] || {};
  return accountSettings.botPasswords[botPasswordName];
};

function checkFarmWikiSettings(farmSettings, wikiName) {
  farmSettings.wikis = farmSettings.wikis || {};
  farmSettings.wikis[wikiName] = farmSettings.wikis[wikiName] || {};
  return farmSettings.wikis[wikiName];
};

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

function deriveKeytarKey(authSystemName, accountName, botPasswordName) {
  return `${authSystemName}|${accountName}|${botPasswordName}`;
};

class AuthSystem {
  constructor(name) {
    this.name = name;
  }
  addBotPassword(accountName, botPasswordName, botPassword) {
    const keytarKey = deriveKeytarKey(this.name, accountName, botPasswordName);
    keytar.setPassword(projectName, keytarKey, botPassword);
  }
}

class Wiki extends AuthSystem {
  constructor(name, parentFarm) {
    super(name);
    this.parentFarm = parentFarm;
  }
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
  setUrl(wikiUrl) {
    const wikiSettings = checkWikiSettings(this.name);
    wikiSettings.url = wikiUrl;

    saveSettings();
  }
}

class Farm extends AuthSystem {
  constructor(name) {
    super(name);
  }
  addBotPassword(accountName, botPasswordName, botPassword) {
    super.addBotPassword(accountName, botPasswordName, botPassword);

    const farmSettings = checkFarmSettings(this.name);
    const farmAccountSettings = checkAccountSettings(farmSettings, accountName);
    const farmAccountPasswordSettings = checkAccountPasswordSettings(farmAccountSettings, botPasswordName);

    saveSettings();
  }
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

  addBotPasswordForAuthSystem(authSystemData, botPasswordData) {
    const authSystemObject = authSystemData.isFarm
      ? new Farm(authSystemData.name)
      : new Wiki(authSystemData.name);

    authSystemObject.addBotPassword(botPasswordData.accountName, botPasswordData.botPasswordName, botPasswordData.botPassword);
  },

  createStandaloneWikiWithUrl(wikiName, wikiUrl) {
    const wiki = new Wiki(wikiName);
    wiki.setUrl(wikiUrl);
  },

  createWikiFarmWithUrls(farmName, wikiUrls) {
    const farm = new Farm(farmName);
    farm.addWikisFromUrls(wikiUrls);
  }
};
