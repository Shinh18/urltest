/* eslint-disable no-undef */
const { printColoredOutput } = require('./printColoredOutput');
const chalk = require('chalk');

const originalConsoleLogFn = global.console.log;
const originalConsoleErrorFn = global.console.error;

describe('Tests for printColoredOutput', () => {
  let logOutput = null;
  let errorOutput = null;

  function testLogFn(...args) {
    logOutput = logOutput || [];
    args.forEach((arg) => logOutput.push(arg));
  }

  function testErrorFn(...args) {
    errorOutput = errorOutput || [];
    args.forEach((arg) => errorOutput.push(arg));
  }

  function finalize(output) {
    if (output && Array.isArray(output)) {
      return output.join('');
    }
    return output;
  }

  beforeEach(() => {
    global.console.log = testLogFn;
    global.console.error = testErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  afterEach(() => {
    global.console.log = originalConsoleLogFn;
    global.console.error = originalConsoleErrorFn;

    logOutput = null;
    errorOutput = null;
  });

  test('Url with response status code 200 prints in green with --all flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '200' }];
    const flag = '--all';
    printColoredOutput(url, flag);
    const expected = chalk.green.bold(`200: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test('Url with reponse status code 400 prints in red with --all flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '400' }];
    const flag = '--all';
    printColoredOutput(url, flag);
    const expected = chalk.red.bold(`400: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test('Url with reponse status code 404 prints in red with --all flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '404' }];
    const flag = '--all';
    printColoredOutput(url, flag);
    const expected = chalk.red.bold(`404: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test('Url with response status code 505 prints in red with --all flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '505' }];
    const flag = '--all';
    printColoredOutput(url, flag);
    const expected = chalk.grey.bold(`505: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test('Url with reponse status code 200 prints in green with --good flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '200' }];
    const flag = '--good';
    printColoredOutput(url, flag);
    const expected = chalk.green.bold(`200: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });

  test('Url with reponse status code 404 prints in red with --bad flag', async () => {
    const url = [{ url: 'https://www.senecacollege.ca/', status: '404' }];
    const flag = '--bad';
    printColoredOutput(url, flag);
    const expected = chalk.red.bold(`404: https://www.senecacollege.ca/`);

    expect(finalize(logOutput)).toEqual(expected);
    expect(finalize(errorOutput)).toBe(null);
  });
});
