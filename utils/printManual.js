const chalk = require('chalk');

const printManual = () => {
  console.log(chalk.red('\n                Standard user manual                '));
  console.log(chalk.gray('----------------------------------------------------'));
  console.log(chalk.redBright('urltester filename      '), 'reports good,bad,unknown urls');
  console.log(chalk.redBright('urltester -v |version   '), 'displays tool version');
  console.log(chalk.redBright('urltester -j |json | j  '), 'displays output in JSON form');
  console.log(chalk.redBright('----------------------------------------------------\n'));
};

module.exports = { printManual };
