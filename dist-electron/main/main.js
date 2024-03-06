"use strict";
const electron = require("electron");
const path = require("node:path");
var Store = require("electron-store");
const store = new Store();
require("@electron/remote/main").initialize();
var t = store.get("localTime");
if (!t) {
  store.set("localTime", (/* @__PURE__ */ new Date()).getTime());
}
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true
    }
  });
  require("@electron/remote/main").enable(win.webContents);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", "");
  });
  electron.Menu.setApplicationMenu(null);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(createWindow);
electron.ipcMain.on("openExportWindow", (e, arg) => {
  var w = new electron.BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule: true
    }
  });
  require("@electron/remote/main").enable(w.webContents);
  w.webContents.on("did-finish-load", () => {
    w == null ? void 0 : w.webContents.send("main-process-message", arg);
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
});
electron.app.on("window-all-closed", () => {
  electron.app.quit();
});
electron.ipcMain.on("relaunch", (e, arg) => {
  electron.app.relaunch();
  electron.app.exit();
});
//# sourceMappingURL=main.js.map
