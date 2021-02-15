const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    remote: (channel, ...data) => {
      const validChannels = [
        "getAuthSystemList",
        "addBotPasswordForAuthSystem",
        "createStandaloneWikiWithUrl",
        "createWikiFarmWithUrls",
        "getUser", "getUserLists",
        "loginUser", "logoutUser", "disconnectServer"
      ];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...data);
      }
      throw new Error(`Unrecognized remote call: ${channel}`);
    }
  }
);
