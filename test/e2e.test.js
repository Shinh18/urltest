/* eslint-disable no-undef */
const { run } = require('./run');

describe('end-to-end integration', () => {
  test('when no arguments passed prints error and help message', async () => {
    const { stderr, stdout, exitCode } = await run();
    expect(exitCode).toBe(0);
    expect(stderr).toMatchSnapshot();
    expect(stdout).toEqual('Standard user manual················---------------------------------------------------
urltester filename       reports good,bad,unknown urls
urltester -v |version    displays tool version
urltester -j |json | j   displays output in JSON form
----------------------------------------------------');
  });
  /*
  test('when argument --help is specified should print help message', async () => {
    const { stderr, stdout, exitCode } = await run('--help');
    expect(exitCode).toBe(0);
    expect(stdout).toMatchSnapshot();
    expect(stderr).toEqual('');
  });
  */
});
