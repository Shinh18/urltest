/* eslint-disable no-undef */
const { checkUrl } = require('./checkUrl');

describe('Tests for Urls responses', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Url with response status code 200 should be interpreted as GOOD', async () => {
    const url = 'https://www.senecacollege.ca/';
    const response = { url: `${url}`, status: `200` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 200 });
    const data = await checkUrl(url);

    expect(data).toEqual(response);
  });

  test('Url with response status code 400 should be interpreted as BAD', async () => {
    const url = 'https://www.senecacollege.ca/';
    const response = { url: `${url}`, status: `400` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 400 });
    const data = await checkUrl(url);

    expect(data).toEqual(response);
  });

  test('Url with response status code 404 should be interpreted as BAD', async () => {
    const url = 'https://www.senecacollege.ca/';
    const response = { url: `${url}`, status: `404` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 404 });
    const data = await checkUrl(url);

    expect(data).toEqual(response);
  });

  test('Url with response status code 505 should be interpreted as UNKNOWN', async () => {
    const url = 'https://www.senecacollege.ca/';
    const response = { url: `${url}`, status: `505` };
    fetch.mockResponseOnce('{ "id": 1 }', { status: 505 });
    const data = await checkUrl(url);

    expect(data).toEqual(response);
  });

  test('Url with no response status should be interpreted as UNKNOWN', async () => {
    const url = 'https://www.senecacollege.ca/';
    const response = { url: `${url}`, status: `404` };
    fetch.mockReject(new Error('errors'));

    const data = await checkUrl(url);

    expect(data).toEqual(response);
  });
});
