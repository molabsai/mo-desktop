import { menubar } from "menubar";

const mb = menubar({
  dir: process.cwd(),
  icon: `${process.cwd()}/images/menubar-icon/icon.white.png`,
  tooltip: "MO Labs",
  index: "https://life.molabs.ai/",
  browserWindow: {
    width: 800,
    height: 600,
  },
});

mb.on("ready", () => {
  console.log("menubar app is ready");
  mb.showWindow();
});

// import { app, BrowserWindow } from "electron";
// import * as path from "path";

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//     },
//     backgroundColor: "#000",
//   });
//   mainWindow.maximize();
//   mainWindow.setMenu(null);

//   mainWindow.loadURL("https://life.molabs.ai/");
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on("ready", () => {
//   createWindow();

//   app.on("activate", function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

// // In this file you can include the rest of your app"s specific main process
// // code. You can also put them in separate files and require them here.
