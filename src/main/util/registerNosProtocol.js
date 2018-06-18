import url from 'url';
import path from 'path';
import mime from 'mime-types';
import fetch from 'node-fetch';
import { protocol } from 'electron';
import { createReadStream } from 'fs';
import { omit } from 'lodash';

import resolve from './resolve';

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

export default function registerNosProtocol() {
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
