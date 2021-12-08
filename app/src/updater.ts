import { app, dialog } from "electron";
import { autoUpdater } from "electron-updater";

const server = "https://hazel-molabsai.vercel.app";
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ provider: "generic", url });

setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify();
}, 1000 * 60 * 15);

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Restart", "Later"],
    title: "Application Update",
    message: process.platform === "win32" ? releaseNotes : releaseName,
    detail:
      "A new version has been downloaded. Restart the application to apply the updates.",
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});

autoUpdater.on("error", (message) => {
  console.error("There was a problem updating the application:", message);
});
