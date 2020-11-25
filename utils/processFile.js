const chalk = require('chalk');
const fetch = require('node-fetch');
const fs = require('fs');

var displayAll = true;
var displayGood = false;
var displayBad = false;

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
            if (flag === '--all' || flag === 'none') {
              displayAll = true;
              displayGood = true;
              displayBad = true;
              printColoredOutput(results);
            } else if (flag === '--good') {
              displayGood = true;
              displayAll = false;
              printColoredOutput(results);
            } else if (flag === '--bad') {
              displayBad = true;
              displayAll = false;
              printColoredOutput(results);
            }
          }
        })
        .catch((err) => console.log('Error message: ', err));
    }
  });
};

const checkUrl = async (url) => {
  var jsonOutput = [];
  var urlElement;
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 1500 });
    urlElement = { url: `${url}`, status: `${res.status}` };
    jsonOutput.push(urlElement);
  } catch (error) {
    urlElement = { url: `${url}`, status: '404' };
    jsonOutput.push(urlElement);
  }
  return urlElement;
};

const printColoredOutput = (urlArray) => {
  for (var item of urlArray) {
    if (item.status == '200' && displayGood)
      console.log(chalk.green.bold(` ${item.status}: ${item.url} `));
    else if ((item.status == '400' || item.status == '404') && displayBad)
      console.log(chalk.red.bold(` ${item.status}: ${item.url} `));
    else if (displayAll) console.log(chalk.grey.bold(` ${item.status}: ${item.url} `));
  }
};

module.exports = { processFile };
