/**
 * Live reload
 */
const fs = require("fs");
const watchTo = "./";
const reloadWatcher = fs.watch(watchTo, { recursive: false }, function () {
  reloadWatcher.close();
  // Reload NodeJS modules
  for (const i in require.cache) {
    delete require.cache[i];
  }
  // Reload window
  const win = nw.Window.get();
  win.menu = null;
  win.reload();
});
