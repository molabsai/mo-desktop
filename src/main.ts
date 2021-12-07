import { app, Tray, Menu, shell } from "electron";
import { menubar } from "menubar";

// TODO: get app name + icons working
//       we hide the dock, but still useful to have in e.g. activity monitor

// TODO: fix the menu bar icon doing nothing on repeated click
//       https://github.com/maxogden/menubar/issues/311

app.on("ready", () => {
  const tray = new Tray(`${process.cwd()}/images/menubar-icon/icon.white.png`);
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
    dir: process.cwd(),
    index: "https://life.molabs.ai/",
    browserWindow: {
      width: 800,
      height: 600,
    },
  });

  mb.on("ready", () => {
    console.log("menubar app is ready");
    mb.showWindow();

    // If there's a dock icon, make sure tabbing over to it shows the window
    mb.app.on("did-become-active", () => {
      mb.showWindow();
    });
  });

  // menubar is supposed to hide the dock icon by default, but it's not working so we'll do it manually
  // https://github.com/maxogden/menubar/issues/306
  mb.on("after-create-window", () => {
    mb.app.dock.hide();
  });
});
