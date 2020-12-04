import fs from "fs";
import path from "path";
import Bot from "@sidemen19/mediawiki.js";
import keytar from "keytar";
import defaultSettings from "../spellbook.json";
import { app } from "electron";
import { getWikiInfo } from "./wikiDetect.js";

// Should hook into node project varaible REFERENCE TWICE
const projectName = "MediaWikiAGE";

export default {
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
  toString() {
    return JSON.stringify(this.settings);
  },
  get all() {
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
  get getFarms() {
    return this.settings.farms;
  },
  getUserData: function(key) {
    const { name, site, groups, note } = this.getUsers[key];
    const { server, scriptpath, farm } = this.getSites[site];
    const farmNote = (this.getFarms[farm]||{}).note;
    const farmName = (this.getFarms[farm]||{}).name;
    return { key, name, groups, server, scriptpath, note, farmNote, farmName };
  },
  get getUserLists() {
    const users = this.getUsers;
    return Object.keys(users).map(key => this.getUserData(key));
  },
  async getUserCred(userKey) {
    const user = this.getUsers[userKey];
    const site = this.getSites[user.site];
    const farm = this.getFarms[site.farm];
    return {
      server: site.server,
      path: site.scriptpath,
      name: (farm || user).username,
      pass: await keytar.getPassword(projectName, userKey)
    };
  },
  addSingleUser(username, password, url, note) {
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
        path: siteinfo.general.scriptpath
      });
      try {
        const loginResult = await tempBot.login(username, password);
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
  addFarm(farmName, username, password, farmNote) {
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
  async addFarmUser(farmName, username, url, note) {
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
      });
      try {
        const loginResult = await tempBot.login(username, password);
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
        }
      } catch (err) {
        console.log(err.name, err.message);
      }
    });
  }
};