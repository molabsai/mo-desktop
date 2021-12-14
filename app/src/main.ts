import { app, BrowserWindow, screen } from "electron";
import { createTray } from "./tray";
import "./updater";

// If we don't define these here, they get garbage collected which results in the e.g. tray disappearing
let window: BrowserWindow;

// Not sure why `productName` from `electron-builder.js` isn't being used for the app name, so we'll set it manually here.
app.setName("MO");

app.on("ready", () => {
  const { width, height } = screen.getPrimaryDisplay().size;
  window = new BrowserWindow({
    width: width * 0.6,
    height: height * 0.6,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    backgroundColor: "#000",
  });
  window.loadURL("https://life.molabs.ai/");

  // Make the window draggable via anywhere in the body
  window.webContents.insertCSS("body { -webkit-app-region: drag; }");

  createTray(window);
});
