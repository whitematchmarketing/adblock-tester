const path = require("path");
const fs = require("fs");
//joining path of directory
const directoryPath = path.join(__dirname, "src/includes");

fs.readdir(directoryPath, function(err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  //listing all files using forEach
  files
    .filter(file => file.lastIndexOf(".html") === file.length - 5)
    .forEach(function(file) {
      const fileNameNoExtenstion = file.replace(".html", "");
      const html = fs.readFileSync(directoryPath + "/" + file, "utf8");
      const jsModule = `module.exports = \`${html}\`;`;
      fs.writeFileSync(`${directoryPath}/${fileNameNoExtenstion}.js`, jsModule);
      console.log("Done for", file);
    });
});
