import { app, Tray, Menu, shell } from "electron";
import { menubar } from "menubar";
import path from "path";
import "./updater";

// TODO: fix the menu bar icon doing nothing on repeated click
//       https://github.com/maxogden/menubar/issues/311

// Not sure why `productName` from `electron-builder.js` isn't being used for the app name, so we'll set it manually here.
app.setName("MO Labs");

app.on("ready", () => {
  const tray = new Tray(
    path.join(__dirname, "..", "resources", "tray-icon.png")
  );
  tray.setToolTip("MO Labs");

  const contextMenu = Menu.buildFromTemplate([
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
    { type: "separator" },
    { role: "quit", label: "Quit MO" },
  ]);

  tray.on("right-click", () => {
    tray.popUpContextMenu(contextMenu);
  });

  const mb = menubar({
    tray,
    index: "https://life.molabs.ai/",
    activateWithApp: true,
    preloadWindow: true,
    browserWindow: {
      width: 800,
      height: 600,
    },
  });

  mb.on("ready", async () => {
    mb.showWindow();

    // If there's a dock icon, make sure tabbing over to it shows the window
    mb.app.on("did-become-active", () => {
      if (mb.window?.isVisible()) return;
      mb.showWindow();
    });
  });

  // menubar is supposed to hide the dock icon by default, but it's not working so we'll do it manually
  // https://github.com/maxogden/menubar/issues/306
  mb.on("after-create-window", () => {
    mb.app.dock.hide();
  });
});
