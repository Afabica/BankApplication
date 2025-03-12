const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:3000");
  //  mainWindow.loadFile(path.join(__dirname, "renderer", "dashboard.js"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
//app.whenReady().then(createWindow);
//mainWindow.whenReady().then(() => {
//  createWindow();
//
//  mainWindow.on("activate", () => {
//    if (BrowserWindow.getAllWindows().length === 0) createWindow();
//  });
//});
//
//app.on("window-all-closed", () => {
//  if (process.platform !== "darwin") {
//    app.quit();
//  }
//});

//app.on("activate", () => {
//  if (BrowserWindow.getAllWindows().length === 0) createWindow();
//});
