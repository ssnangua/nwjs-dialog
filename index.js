"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/nwjs-dialog.cjs.min.js");
} else {
  module.exports = require("./dist/nwjs-dialog.cjs.js");
}
