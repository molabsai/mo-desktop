import { app, Tray, Menu, shell, BrowserWindow, screen } from "electron";
import path from "path";
import "./updater";

// If we don't define these here, they get garbage collected which results in the e.g. tray disappearing
let window: BrowserWindow;
let tray: Tray;

// Not sure why `productName` from `electron-builder.js` isn't being used for the app name, so we'll set it manually here.
app.setName("MO");

app.on("ready", () => {
  const { width, height } = screen.getPrimaryDisplay().size;
  window = new BrowserWindow({
    width: width * 0.6,
    height: height * 0.6,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
  });

  window.loadURL("https://life.molabs.ai/");

  // Make the window draggable via anywhere in the body
  window.webContents.insertCSS("body { -webkit-app-region: drag; }");

  tray = new Tray(path.join(__dirname, "..", "resources", "tray-icon.png"));
  tray.setToolTip("MO");

  tray.on("click", () => {
    window.show();
  });

  tray.on("right-click", () => {
    tray.popUpContextMenu(
      Menu.buildFromTemplate([
        {
          label: "Show MO",
          click: () => {
            window.show();
          },
        },
        { type: "separator" },
        {
          label: "About MO",
          click: () => {
            shell.openExternal("https://molabs.ai/info");
          },
        },
        {
          label: "Shop",
          click: () => {
            shell.openExternal("https://molabs.ai/shop");
          },
        },
        {
          label: "Discord",
          click: () => {
            shell.openExternal("https://molabs.ai/discord");
          },
        },
        { type: "separator" },
        { role: "quit", label: "Quit MO" },
      ])
    );
  });
});
