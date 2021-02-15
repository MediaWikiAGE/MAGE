"use strict";
import path from "path";
import { config as load_env } from "dotenv";
import { app, protocol, BrowserWindow, Menu, MenuItem, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import Bot from "@sidemen19/mediawiki.js";
import spellbook from "./libraries/spellbook.js";
import menuTemplate from "./libraries/menuTemplate.js";

// Load .env file for testing
load_env();

const isDevelopment = process.env.NODE_ENV !== "production";

const isMac = process.platform !== "darwin";

spellbook.loadSettings();
let current_user = new Bot();

const getUserData = (event, arg) => {
  return new Promise((res, rej) => res({
    cacheSite: current_user.cacheSite,
    cacheUser: current_user.cacheUser
  }));
};

ipcMain.handle("addBotPasswordForAuthSystem", (event, ...args) => {
  const [ authSystemData, botPasswordData ] = args;
  spellbook.addBotPasswordForAuthSystem(authSystemData, botPasswordData);
});

ipcMain.handle("createStandaloneWikiWithUrl", (event, ...args) => {
  const [ wikiName, wikiUrl ] = args;
  spellbook.createStandaloneWikiWithUrl(wikiName, wikiUrl);
});

ipcMain.handle("createWikiFarmWithUrls", (event, ...args) => {
  const [farmName, wikiUrls ] = args;
  spellbook.createWikiFarmWithUrls(farmName, wikiUrls);
});

ipcMain.handle("getUser", getUserData);
ipcMain.handle("getUserLists", (event, arg) => {
  return new Promise((res, rej) => res(spellbook.getUserLists));
});
ipcMain.handle("loginUser", async (event, arg) => {
  const { server, path, name, pass } = await spellbook.getUserCred(arg);
  console.log(server, path);
  await current_user.setServer(server, path);
  await current_user.login(name, pass);
  return getUserData();
});
ipcMain.handle("logoutUser", async (event, arg) => {
  await current_user.logout();
  return getUserData();
});
ipcMain.handle("disconnectServer", (event, arg) => {
  current_user = new Bot();
  return getUserData();
});

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // process.env.ELECTRON_NODE_INTEGRATION hardcode to true
      // eslint-disable-next-line no-undef
      preload: path.join(__static, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    },
    backgroundColor: "#F6F7F9"
  });
  //const menu = Menu.buildFromTemplate(menuTemplate);
  //Menu.setApplicationMenu(menu);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol("app");

    win.loadURL("app://./index.html");
  }
  if (process.env.DEV_OPEN) await win.webContents.openDevTools();
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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    /* Devtools has issue installing. If someone can fix that would be godly
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
