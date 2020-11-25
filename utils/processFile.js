const fs = require('fs');
const chalk = require('chalk');
const { checkUrl } = require('./checkUrl');
const { printColoredOutput } = require('./printColoredOutput');

const processFile = (filePath, json, flag) => {
  fs.readFile(filePath, 'utf-8', function (err, data) {
    if (err) console.log(chalk.red('Unsuccessful to read file'), err);
    else {
      const urlArr = data.match(/(http|https)(:\/\/)([\w+\-&@`~#$%^*.=/?:]+)/gi);
      const promises = urlArr.map(checkUrl);
      Promise.all(promises)
        .then((results) => {
          if (json) {
            console.log(JSON.stringify(results));
          } else {
            printColoredOutput(results, flag);
          }
        })
        .catch((err) => console.log('Error message: ', err));
    }
  });
};

module.exports = { processFile };
