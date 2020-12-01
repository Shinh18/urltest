/* eslint-disable no-undef */
const { printManual } = require('./printManual');
var data =
  '\n                Standard user manual                \n' +
  '----------------------------------------------------\n' +
  'urltester filename      reports good,bad,unknown urls\n' +
  'urltester -v |version   displays tool version\n' +
  'urltester -j |json | j  displays output in JSON form\n' +
  '----------------------------------------------------\n';

describe('Tests for Print Manual', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Print Manual should give correct output', async () => {
    const response = printManual();
    expect(data).toEqual(response);
  });
});
