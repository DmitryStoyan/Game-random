const fs = require("fs");
const path = require("path");

const imageFolders = [
  {
    folder: "./src/images/game",
    exportFile: "./src/initialRouletteImg.js",
    exportName: "initialRouletteImg",
    importPath: "@/images/game/",
  },
  {
    folder: "./src/images/game-library",
    exportFile: "./src/initialLibraryImg.js",
    exportName: "initialLibraryImg",
    importPath: "@/images/game-library/",
  },
];

imageFolders.forEach(({ folder, exportFile, exportName, importPath }) => {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${folder}:`, err);
      return;
    }

    const imports = [];
    const exports = [];

    files.forEach((file) => {
      const key = path
        .basename(file, path.extname(file))
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase();
      imports.push(`const ${key} = require('${importPath}${file}');`);
      exports.push(`  ${key},`);
    });

    const content = `
${imports.join("\n")}

export const ${exportName} = {
${exports.join("\n")}
};
`;

    fs.writeFile(exportFile, content.trim(), (err) => {
      if (err) {
        console.error(`Error writing to file ${exportFile}:`, err);
        return;
      }
      console.log(`File ${exportFile} has been saved!`);
    });
  });
});
