/** @type {import('electron-builder').Configuration} */

// https://medium.com/jspoint/packaging-and-distributing-electron-applications-using-electron-builder-311fc55178d9

module.exports = {
  appId: "ai.molabs.desktop",
  productName: "MO Labs",
  directories: {
    output: "build",
    buildResources: "app/resources",
  },
  files: ["package.json", "node_modules", "app/**/*"],
  mac: {
    category: "public.app-category.games",
    target: "dmg",
  },
  win: {
    target: "nsis",
  },
  linux: {
    target: "tar.gz",
  },
};
