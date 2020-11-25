/* eslint-disable no-undef */
'use strict';

import path from 'path';
import fs from 'fs';
import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import defaultSettings from './spellbook.json';

//Practice Keytar (and data storage)
import keytar from 'keytar';

const isDevelopment = process.env.NODE_ENV !== 'production';

const isMac = process.platform !== 'darwin';

//Load Config
const spellbook = {
  settings: defaultSettings,
  set set(add) {
    this.settings = add;
  },
  set addUserData(add) {
    this.settings.users.push(add);
  },
  set addSiteData(add){
    this.settings.sites[add.key] = add.val;
  },
  set addFarmData(add){
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
  addSingleUser: function(username,password,url,note) {
};

try {
  spellbook.set = JSON.parse(fs.readFileSync(path.join(app.getPath('userData'),'spellbook.json')));
} catch (err){
  if (err.name === "SyntaxError")
    console.error("Spellbook bad json");
  else
    fs.writeFileSync(path.join(app.getPath('userData'),'spellbook.json'),spellbook.export);
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    },
    backgroundColor: '#777'
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    //if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
