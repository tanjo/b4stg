#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const commander = require('commander');
const packageJson = require('./package.json');

const main = () => {
  commander
      .version(packageJson.version, '-v, --version')
      .parse(process.argv);

   const argc = commander.args.length;

  let destination;
  if (argc < 1) {
    destination = process.cwd() + "/index.html"
  } else {
    destination = path.resolve(commander.args[0]);
  }

  if (fs.existsSync(destination)) {
    console.error(`[Error]: File exists ${destination}`);
    return;
  }

  let basename = path.basename(destination);
  let extname = path.extname(destination);
  try {
    switch (true) {
      case /html/i.test(extname):
        fs.copyFileSync(path.resolve("./templates/HTML"), destination, fs.constants.COPYFILE_EXCL);
        console.log(`[Info]: Generate ${destination}`)
        return;
    }
  } catch (err) {
    console.error(`[Error]: ${err}`);
  }
};

main();
