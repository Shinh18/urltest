// chalk = require('chalk');

const printManual = () => {
  var str =
    '\n                Standard user manual                \n' +
    '----------------------------------------------------\n' +
    'urltester filename      reports good,bad,unknown urls\n' +
    'urltester -v |version   displays tool version\n' +
    'urltester -j |json | j  displays output in JSON form\n' +
    '----------------------------------------------------\n';
  return str;
};

/*
const printManual = () => {
  console.log(chalk.red('\n                Standard user manual                '));
  console.log(chalk.gray('----------------------------------------------------'));
  console.log(chalk.redBright('urltester filename      '), 'reports good,bad,unknown urls');
  console.log(chalk.redBright('urltester -v |version   '), 'displays tool version');
  console.log(chalk.redBright('urltester -j |json | j  '), 'displays output in JSON form');
  console.log(chalk.redBright('----------------------------------------------------\n'));
};
*/
module.exports = { printManual };
