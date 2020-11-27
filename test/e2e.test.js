/* eslint-disable no-undef */
const { run } = require('./run');
const { printManual } = require('../utils/printManual');

describe('end-to-end integration', () => {
  test('when no arguments passed prints error and help message', async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(1);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual(printManual());
  });
});
