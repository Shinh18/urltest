/* eslint-disable no-undef */
const { run } = require('./run');
const { printManual } = require('../utils/printManual');

describe('end-to-end integration', () => {
  test('when no arguments passed prints error and help message', async () => {
    const { stdout, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stdout).toEqual(printManual());
  });
});
