const fs = require("fs");
const path = require("path");

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const currentSource = path.join(source, file);
    const currentTarget = path.join(target, file);

    if (fs.lstatSync(currentSource).isDirectory()) {
      copyFolderRecursiveSync(currentSource, currentTarget);
    } else {
      fs.copyFileSync(currentSource, currentTarget);
    }
  });
}

// Command-line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: node copy-folder.js <sourceFolder> <targetFolder>");
  process.exit(1);
}

const sourceFolder = args[0];
const targetFolder = args[1];

copyFolderRecursiveSync(sourceFolder, targetFolder);
console.log(`Contents of ${sourceFolder} successfully copied to ${targetFolder}`);
