"use strict";
import { config as load_env } from "dotenv";
import path from "path";
import fs from "fs";
import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import defaultSettings from "./spellbook.json";
import { getWikiInfo } from "./libraries/wikiDetect.js";
import Bot from "@sidemen19/mediawiki.js";
import keytar from "keytar";

//Load .env file for testing
load_env();

//Should hook into node project varaible
const projectName = "MediaWikiAGE";

const isDevelopment = process.env.NODE_ENV !== "production";

const isMac = process.platform !== "darwin";

//Load Config
const spellbook = {
  settingFileError: false,
  settings: defaultSettings,
  set set(add) {
    this.settings = add;
  },
  set addUserData(add) {
    this.settings.users[add.key] = { ...(this.settings.users[add.key]||{}), ...add.val };
  },
  set addSiteData(add) {
    this.settings.sites[add.key] = { ...(this.settings.sites[add.key]||{}), ...add.val };
  },
  set addFarmData(add) {
    this.settings.farms[add.key] = { ...(this.settings.farms[add.key]||{}), ...add.val };
  },
  loadSettings: function() {
    //Load Settings
    try {
      this.set = JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), "spellbook.json")));
    } catch (err) {
      if (err.name === "SyntaxError") {
        this.settingFileError = true;
        console.error("Spellbook bad json. Warn user here, and do NOT overwrite their filesave. Suggest to load over from scratch");
      } else {
        //DEFAULT SETTINGS SAVE IF NO FILE DETECTED (ASSUME FIRST STARTUP)
        this.saveSettings();
        //Delete keytar as well
        keytar.findCredentials(projectName)
          .then(creds => creds.forEach(obj => keytar.deletePassword(projectName, obj.account)));
      }
    }
  },
  saveSettings: function() {
    //PROMPT USER TO OVERWRITE BAD FILE SETTING???
    const overwrite = true;
    if (!this.settingFileError || overwrite) {
      fs.writeFileSync(path.join(app.getPath("userData"), "spellbook.json"), this.export);

      //Flush keytar on a True Overwrite
      if(this.settingFileError) {
        this.settingFileError = false;
        keytar.findCredentials(projectName)
          .then(creds => creds.forEach(obj => keytar.deletePassword(projectName, obj.account)));
      }
    }
  },
  get toString() {
    return JSON.stringify(this.settings);
  },
  get get() {
    return this.settings;
  },
  get export() {
    return JSON.stringify(this.settings, null, 4);
  },
  get getUsers() {
    return this.settings.users;
  },
  get getSites() {
    return this.settings.sites;
  },
  get getFarm() {
    return this.settings.farms;
  },
  addSingleUser: function(username, password, url, note) {
    /*Probable structure
    let userOut = {
        "site": "genshin-impact-1",
        "note": "Main Account",
        "isBot": true,
        "theme": "light"
    }*/
    class ErrInput extends Error {
      constructor(msg) {
        super(msg);
        this.name = "ErrInput";
      }
    }
    if (typeof username === "undefined" || username.length === 0)
      throw new ErrInput("Username can't be undefined");
    if (typeof password === "undefined" || password.length === 0)
      throw new ErrInput("Password can't be undefined");
    const scriptPath = new URL(url);

    //Chunk Load Script Path
    getWikiInfo(scriptPath).then(async resp => {
      const siteinfo = resp.body.query;

      //Site data
      const siteOut = {};
      ["articlepath", "scriptpath", "lang", "server", "generator"].forEach(key => siteOut[key] = siteinfo.general[key]);
      const siteKey = `${siteinfo.general.server+siteinfo.general.scriptpath}|${siteinfo.general.wikiid}`;

      const tempBot = new Bot({
        server: siteinfo.general.server,
        path: siteinfo.general.scriptpath,
        botUsername: username,
        botPassword: password
      });
      try {
        const loginResult = await tempBot.login();
        if (loginResult.login.result === "Failed")
            console.log(loginResult.login.reason);
        else {
          const whoResult = await tempBot.whoAmI();
          const userOut = {
            username: username,
            site: siteKey
          };
          ["name", "groups", "rights"].forEach(key => userOut[key]= whoResult[key]);
          const userKey = `${siteKey}|${username}`;
          if (typeof note !== "undefined")
            userOut.note = note;
          this.addUserData = {
            key: userKey,
            val: userOut
          };
          this.addSiteData={
            key: siteKey,
            val: siteOut
          };
          this.saveSettings();
          keytar.setPassword(projectName, userKey, password);
        }
      } catch (err) {
        console.log(err.name, err.message);
      }
    });
  },
  addFarm: function(farmName, username, password, farmNote) {
    const farmKey = `${farmName}|${username}`;
    const farmData = {
      key: farmKey,
      val: {
        name: farmName,
        username: username
      }
    };
    if (typeof farmNote !== "undefined")
      farmData.val.note = farmNote;
    this.addFarmData=farmData;
    this.saveSettings();
    keytar.setPassword(projectName, farmKey, password);
  },
  addFarmUser: async function(farmName, username, url, note) {
    const farmKey = `${farmName}|${username}`;
    const scriptPath = new URL(url);
    const password = await keytar.getPassword(projectName, farmKey);
    getWikiInfo(scriptPath).then(async resp => {
      const siteinfo = resp.body.query;

      //Site data
      const siteOut = {
        farm: farmKey
      };
      ["articlepath", "scriptpath", "lang", "server", "generator"].forEach(key => siteOut[key] = siteinfo.general[key]);
      const siteKey = `${siteinfo.general.server+siteinfo.general.scriptpath}|${siteinfo.general.wikiid}`;

      const tempBot = new Bot({
        server: siteinfo.general.server,
        path: siteinfo.general.scriptpath,
        botUsername: username,
        botPassword: password
      });
      try {
        const loginResult = await tempBot.login();
        if (loginResult.login.result === "Failed")
            console.log(loginResult.login.reason);
        else {
          const whoResult = await tempBot.whoAmI();
          const userOut = {
            site: siteKey
          };
          ["name", "groups", "rights"].forEach(key => userOut[key]= whoResult[key]);
          const userKey = `${siteKey}|${username}`;
          if (typeof note !== "undefined")
            userOut.note = note;
          this.addUserData = {
            key: userKey,
            val: userOut
          };
          this.addSiteData={
            key: siteKey,
            val: siteOut
          };
          this.saveSettings();
          keytar.setPassword(projectName, userKey, password);
        }
      } catch (err) {
        console.log(err.name, err.message);
      }
    });
  }
};
spellbook.loadSettings();

//Hidden Testing
if (process.env.WIKIUSER) {
  spellbook.addSingleUser(process.env.WIKIUSER, process.env.PASSWORD, process.env.SITE, "Test Note");
  spellbook.addFarm("MyFandom", process.env.FARM_WIKIUSER, process.env.FARM_PASSWORD, "Test Farm Note");
  spellbook.addFarmUser("MyFandom", process.env.FARM_WIKIUSER, process.env.FARM_SITE, "Test User Farm Note");
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: true
    },
    backgroundColor: "#777"
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    //if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    /*Devtools has issue installing. If someone can fix that would be godly
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
    */
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
