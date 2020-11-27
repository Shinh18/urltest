#!/usr/bin/env node

const boxen = require('boxen');
const boxenOptions = require('./style/style');
const chalk = require('chalk');
const path = require('path');
const yargs = require('yargs');
const fileHandler = require('./utils/processFile');
const { printManual } = require('./utils/printManual');

const version = boxen(chalk.redBright.bold('Urltester 1.0.0'), boxenOptions);

/*
const argv = yargs
  .usage('Usage: $0 [option]')
  .alias('f', 'file')
  .nargs('f', 1)
  .describe('f', 'Load a file')
  .demandOption(['f'])
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .alias('V', 'version')
  .alias('all')
  .alias('good')
  .alias('bad')
  .alias('j', 'json')
  .describe('all', 'display all URLs')
  .describe('good', 'display good URLs')
  .describe('bad', 'display bad URLs')
  .describe('json', 'display output in JSON format')
  .version(`${version}`)
  .describe('version', 'display tool version').argv;

if (argv.file) {
  const filePath = path.join(__dirname, argv.file);
  if (argv.json) {
    fileHandler.processFile(filePath, true, 'none');
  } else if (argv.all) {
    fileHandler.processFile(filePath, false, argv.all);
  } else {
    fileHandler.processFile(filePath, false, 'none');
  }
}

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});
*/

if (process.argv.length == 2 || process.argv[2] === '--help') console.log(printManual());
else if (process.argv[2] === 'version' || process.argv[2] === '-v') console.log(version);
else {
  const filePath = path.join(__dirname, process.argv[2]);
  if (process.argv[3] === '-j' || process.argv[3] === '--json' || process.argv[3] === 'j') {
    fileHandler.processFile(filePath, true, 'none');
  } else if (
    process.argv[3] === '--all' ||
    process.argv[3] === '--good' ||
    process.argv[3] === '--bad'
  ) {
    fileHandler.processFile(filePath, false, process.argv[3]);
  } else {
    fileHandler.processFile(filePath, false, 'none');
  }
}

