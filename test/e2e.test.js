/* eslint-disable no-undef */
const { run } = require('./run');
const { printManual } = require('../utils/printManual');

describe('end-to-end integration', () => {
  test('when no arguments passed prints error and help message', async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(printManual());
  });

  test('when argument --help is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--help');
    expect(exitCode).toBe(0);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(printManual());
  });
});
