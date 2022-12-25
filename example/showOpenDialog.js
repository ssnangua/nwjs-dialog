const { showOpenDialog } = require("../dist/nwjs-dialog");

document
  .querySelector('[data-command="showOpenDialog"]')
  .addEventListener("click", () => {
    showOpenDialog({
      // title: "Dialog title",
      defaultPath: process.cwd(),
      openDirectory: false,
      multiple: true,
      accept: "audio/*,video/*,image/*,.txt,.md",
      returnFormat: "string",
    }).then((filePaths) => {
      console.log(filePaths);
    });
  });
