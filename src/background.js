"use strict";
import path from "path";
import { config as load_env } from "dotenv";
import { app, protocol, BrowserWindow, Menu, MenuItem, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import spellbook from "./libraries/spellbook.js";
import menuTemplate from "./libraries/menuTemplate.js";

// Load .env file for testing
load_env();

const isDevelopment = process.env.NODE_ENV !== "production";

const isMac = process.platform !== "darwin";

//Load Config
spellbook.loadSettings();
const current_user = null;

// Hidden testing
if (process.env.WIKIUSER) {
  spellbook.addSingleUser(process.env.WIKIUSER, process.env.PASSWORD, process.env.SITE, "Test Note");
  spellbook.addFarm("MyFandom", process.env.FARM_WIKIUSER, process.env.FARM_PASSWORD, "Test Farm Note");
  spellbook.addFarmUser("MyFandom", process.env.FARM_WIKIUSER, process.env.FARM_SITE, "Test User Farm Note");

  // Select user id from the list... can this be an integer reference and not a key O.o
}
ipcMain.handle("getUser", (event, arg) => {
  if (!current_user)
    return new Promise((res, rej) => res(null));
  return current_user.whoAmI();
  
});
ipcMain.handle("getUserLists", (event, arg) => {
  return new Promise((res, rej) => res(spellbook.getUserLists));
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
