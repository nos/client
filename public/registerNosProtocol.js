const electron = require('electron');
const path = require('path');
const url = require('url');
const mime = require('mime-types');
const fetch = require('node-fetch');
const { createReadStream } = require('fs');
const { omit } = require('lodash');

const resolve = require('./resolve');

const { protocol } = electron;

function registerNosProtocol() {
  protocol.registerStreamProtocol('nos', async (req, callback) => {
    try {
      const resolvedUrl = url.parse(await resolve(url.parse(req.url)));

      if (resolvedUrl.protocol === 'file:') {
        const contentType = mime.contentType(path.extname(resolvedUrl.path));

        callback({
          statusCode: 200,
          headers: { 'content-type': contentType },
          data: createReadStream(resolvedUrl.path)
        });
      } else {
        const response = await fetch(resolvedUrl.href);

        callback({
          statusCode: response.status,
          // Since the body is being streamed without encoding, we need to strip this header.
          headers: omit(response.headers.raw(), 'content-encoding'),
          data: response.body
        });
      }
    } catch (error) {
      // console.error(error);
      callback({ error });
    }
  });
}

module.exports = registerNosProtocol;
