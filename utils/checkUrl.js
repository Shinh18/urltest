const fetch = require('node-fetch');

const checkUrl = async (url) => {
  var urlElement;
  try {
    const res = await fetch(url, { method: 'HEAD', timeout: 1500 });
    urlElement = { url: `${url}`, status: `${res.status}` };
  } catch (error) {
    urlElement = { url: `${url}`, status: '404' };
  }
  return urlElement;
};

module.exports = { checkUrl };
