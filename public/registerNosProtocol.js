const electron = require('electron');
const path = require('path');
const url = require('url');
const mime = require('mime-types');
const request = require('request');
const { createReadStream } = require('fs');
const { PassThrough } = require('stream');

const resolve = require('./resolve');

const { protocol } = electron;

function createDataStream(str) {
  const stream = new PassThrough();
  stream.push(str);
  stream.push(null);
  return stream;
}

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
        /**
         * TODO: The `request` package allows us to treat `request.get` as a stream.  Unfortunately,
         * the result is treated as content-type "text/plain".  If that can be solved, the solution
         * can be simplified to something like:
         *
         *   callback(request.get(resolvedUrl.href));
         */
        request({ url: resolvedUrl, encoding: null }, (err, response, body) => {
          if (err) throw err;

          callback({
            statusCode: response.statusCode,
            headers: response.headers,
            data: createDataStream(body)
          });
        });
      }
    } catch (error) {
      // console.error(error);
      callback({ error });
    }
  });
}

module.exports = registerNosProtocol;
