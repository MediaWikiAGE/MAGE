/* eslint-disable no-undef */
"use strict";

import path from "path";
import fs from "fs";
import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import defaultSettings from "./spellbook.json";
import {get} from 'got';
import http from 'http';
import https from 'https';
import Bot from '@sidemen19/mediawiki.js';
import keytar from 'keytar';

const projectName = "MediaWikiAGE"; //Should hook into node project varaible

const isDevelopment = process.env.NODE_ENV !== "production";

const isMac = process.platform !== "darwin";

//Load Config
const spellbook = {
  settings: defaultSettings,
  set set(add) {
    this.settings = add;
  },
  set addUserData(add) {
    this.settings.users.push(add);
  },
  set addSiteData(add) {
    this.settings.sites[add.key] = add.val;
  },
  set addFarmData(add) {
    this.settings.farms[add.key] = add.val;
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
  addSingleUser: function(username, password, url, note) { }
};

try {
  spellbook.set = JSON.parse(fs.readFileSync(path.join(app.getPath("userData"), "spellbook.json")));
} catch (err) {
  if (err.name === "SyntaxError")
    console.error("Spellbook bad json");
  else
    fs.writeFileSync(path.join(app.getPath("userData"), "spellbook.json"), spellbook.export);
}

//Load Config
const spellbook = {
  settingFileError: false,
  settings: defaultSettings,
  set set(add) {
    this.settings = add;
  },
  set addUserData(add) {
    this.settings.users[add.key] = {...(this.settings.users[add.key]||{}),...add.val};
  },
  set addSiteData(add) {
    this.settings.sites[add.key] = {...(this.settings.sites[add.key]||{}), ...add.val};
  },
  set addFarmData(add) {
    this.settings.farms[add.key] = {...(this.settings.farms[add.key]||{}), ...add.val};
  },
  loadSettings:function() {
    //Load Settings
    try {
      this.set = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'),'spellbook.json')));
    } catch (err){
      if (err.name === "SyntaxError") {
        this.settingFileError = true;
        console.error("Spellbook bad json. Warn user here, and do NOT overwrite their filesave. Suggest to load over from scratch");
      } else {
        //DEFAULT SETTINGS SAVE IF NO FILE DETECTED (ASSUME FIRST STARTUP)
        this.saveSettings();
        //Delete keytar as well
        keytar.findCredentials(projectName).forEach(obj=>keytar.deletePassword(projectName, obj.account));
      }
    }
  },
  saveSettings:function(){
    let overwrite = true;//PROMPT USER TO OVERWRITE BAD FILE SETTING???
    if (!this.settingFileError || overwrite) {
      fs.writeFileSync(path.join(app.getPath('userData'),'spellbook.json'),this.export);
      if(this.settingFileError) {//Flush keytar on a True Overwrite
        this.settingFileError = false;
        keytar.findCredentials(projectName).forEach(obj=>keytar.deletePassword(projectName, obj.account));
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
  addSingleUser: function(username,password,url,note) {
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
        this.name = 'ErrInput';
      }
    }
    if (typeof username === "undefined" || username.length === 0)
      throw new ErrInput("Username can't be undefined");
    if (typeof password === "undefined" || password.length === 0)
      throw new ErrInput("Password can't be undefined");
    let scriptPath = new URL(url);

    //Chunk Load Script Path
    new Promise((resolve,reject)=>{
      (scriptPath.protocol === "https:"?https:http).request({
          method: "GET",
          port: scriptPath.protocol === "https:"?443:80,
          hostname: scriptPath.hostname,
          path: scriptPath.pathname,
        },
        function(response, err){
          const request = this;
          let body = "";

          //Abort when match chunk
          response.on("data", chunk=>{
            body+=chunk;
            let match = body.match(/(?:src|href)="(.+)(?:load|api)\.php/);            
            if (match)
              request.abort();
          });

          response.on("end", ()=>{
            //Parse Script Path
            let match = body.match(/(?:src|href)="(.+)(?:load|api)\.php/);
            if (!match)
              throw new ErrInput("URL is (probably) not a MediaWiki url.");
            resolve(match[1]);
          });
        }).on('error',reject).end();
    }).then(path=>{
      scriptPath.pathname=path
      //Get clean server and scriptpath values from api.php
      return get(scriptPath.href+"api.php?action=query&meta=siteinfo&type=login&format=json",{responseType:'json'})
    }).then(async resp=>{
      let siteinfo = resp.body.query;

      //Site data
      let temp = {};
      ['articlepath','scriptpath','lang','server','generator'].forEach(key=>temp[key] = siteinfo.general[key]);
      let siteKey = siteinfo.general.server+siteinfo.general.scriptpath+"|"+siteinfo.general.wikiid;

      const bot = new Bot({
        server: siteinfo.general.server,
        path: siteinfo.general.scriptpath+'/',
        botUsername: username,
        botPassword: password
      });
      let loginResult = await bot.login();
      if (loginResult.login.result === 'Failed')
          console.log(loginResult.login.reason);
      else {
        let whoResult = await bot.whoAmI();
        let userOut = {
          username:username,
          site:siteKey
        };
        ['name','groups','rights'].forEach(key=>userOut[key]= whoResult[key]);
        this.addUserData = {
          key:siteKey+"|"+username,
          val:userOut
        };
        this.addSiteData={
          key:siteKey,
          val:temp
        };
        this.saveSettings();
        keytar.setPassword(projectName, siteKey+"|"+username, password);
      }
    });
  },
  addFarm:function(username,password,defaultNote){

  },
  addFarmUser: function(farm,url,note){

  }
};
spellbook.loadSettings();
spellbook.addSingleUser("Echoblast53@Testing","dummypasswordforgithub","https://genshin-impact.fandom.com/es/api.php");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
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
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
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
