import fs from "fs";
const imports = [];
const exports = ["const platformsPreset = {"];
fs.readdirSync("./src/platforms").forEach((platform) => {
  const name = `${platform}_html`;
  imports.push(
    `import ${name} from "../src/platforms/${platform}/MessageBox.html";`
  );
  exports.push(`  ${platform}: {`);
  exports.push(`    dirPath: "",`);
  exports.push(`    htmlTemplate: ${name},`);
  exports.push(`    htmlPath: "",`);
  exports.push(`    icons: {`);
  fs.readdirSync(`./src/platforms/${platform}/icons`).forEach((icon) => {
    const name = icon.replace(/\.(png|gif|webp|jpg|jpeg)$/, "");
    imports.push(
      `import ${platform}_${name} from "../src/platforms/${platform}/icons/${icon}";`
    );
    exports.push(`      ${name}: ${platform}_${name},`);
  });
  exports.push(`    },`);
  exports.push(`    iconsURL: {},`);
  exports.push(`  },`);
});
exports.push("};");
export default imports.concat(exports).join("\r\n");
