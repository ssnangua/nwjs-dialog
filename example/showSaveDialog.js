const fs = require("fs");
const { showSaveDialog } = require("../dist/nwjs-dialog");

document
  .querySelector('[data-command="showSaveDialog"]')
  .addEventListener("click", () => {
    showSaveDialog({
      defaultPath: process.cwd(),
      filename: "1.txt",
      accept: ".txt",
      returnFormat: "string",
    }).then(([filePath]) => {
      console.log(filePath);
      fs.writeFileSync(filePath, new Date().toLocaleString());
    });
  });
