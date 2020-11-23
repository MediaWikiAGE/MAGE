const { join } = require('path');
const updater = require('update-electron-app');
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');

// eslint-disable-next-line no-undef
const isMac = process.platform === 'darwin';

let win;

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            enableRemoteModule: false,
            preload: join(app.getAppPath(), 'js', 'preload.js')
        }
    });

    win.loadFile('index.html');

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light';
        } else {
            nativeTheme.themeSource = 'dark';
        }
        return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system';
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

updater();