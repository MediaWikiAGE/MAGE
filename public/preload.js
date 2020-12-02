const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    remote: (channel, data) => {
      const validChannels = ["getUser", "getUserLists"];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, data);
      }
      throw new Error("App Bad Remote Call");
    }
  }
);

//