const electron = require('electron');
const path = require('path');
const url = require('url');
const mime = require('mime-types');
const fetch = require('node-fetch');
const { createReadStream } = require('fs');
const { omit } = require('lodash');

const resolve = require('./resolve');

const { protocol } = electron;

function streamFile(uri, callback) {
  const contentType = mime.contentType(path.extname(uri.path));

  callback({
    statusCode: 200,
    headers: { 'content-type': contentType },
    data: createReadStream(uri.path)
  });
}

async function streamFetch(uri, callback) {
  const response = await fetch(uri.href);

  // Since the body is being streamed without encoding, we need to strip this header.
  const validHeaders = omit(response.headers.raw(), 'content-encoding');

  callback({
    statusCode: response.status,
    headers: validHeaders,
    data: response.body
  });
}

function registerNosProtocol() {
  protocol.registerStreamProtocol('nos', async (req, callback) => {
    try {
      const uri = url.parse(await resolve(url.parse(req.url)));
      const stream = uri.protocol === 'file:' ? streamFile : streamFetch;

      await stream(uri, callback);
    } catch (error) {
      // console.error(error);
      callback({ error });
    }
  });
}

module.exports = registerNosProtocol;
