import fs from "fs";
const evalTemplate = fs
  .readFileSync("./src/eval.js")
  .toString()
  .replace(/`/g, "\\`")
  .replace(/\${/g, "\\${")
  .trim();
export default "`" + evalTemplate + "`";
