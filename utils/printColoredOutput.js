const chalk = require('chalk');

var displayAll = true;
var displayGood = false;
var displayBad = false;

const printColoredOutput = (urlArray, flag) => {
  if (flag === '--all' || flag === 'none') {
    displayAll = true;
    displayGood = true;
    displayBad = true;
  } else if (flag === '--good') {
    displayGood = true;
    displayAll = false;
  } else if (flag === '--bad') {
    displayBad = true;
    displayAll = false;
  }
  for (var item of urlArray) {
    if (item.status == '200' && displayGood)
      console.log(chalk.green.bold(`${item.status}: ${item.url}`));
    else if ((item.status == '400' || item.status == '404') && displayBad)
      console.log(chalk.red.bold(`${item.status}: ${item.url}`));
    else if (displayAll) console.log(chalk.grey.bold(`${item.status}: ${item.url}`));
  }
};

module.exports = { printColoredOutput };
