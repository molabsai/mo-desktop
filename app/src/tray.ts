import { BrowserWindow, Tray, shell, Menu } from "electron";
import path from "path";

// If we don't define these here, they get garbage collected which results in the e.g. tray disappearing
let tray: Tray;

export const createTray = (window: BrowserWindow): Tray => {
  if (tray) return tray;

  tray = new Tray(path.join(__dirname, "..", "resources", "tray-icon.png"));
  tray.setToolTip("MO");

  tray.setContextMenu(
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
};
