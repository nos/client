import fetch from 'node-fetch';
import fileType from 'file-type';
import { find } from 'lodash';
import { URL } from 'whatwg-url';

function parseMimeTime(buffer) {
  const { mime } = fileType(buffer) || {};
  return mime || 'application/octet-stream';
}

async function fetchToDataURL(url, encoding = 'base64') {
  if (url.protocol === 'data:') {
    return url.href;
  }

  const response = await fetch(url.href);

  if (response.status < 200 || response.status > 299) {
    throw new Error(response.statusText);
  }

  const buffer = await response.buffer();
  const type = response.headers.get('content-type') || parseMimeTime(buffer);
  const data = await buffer.toString(encoding);

  return `data:${type};${encoding},${data}`;
}

export default async function fetchBestIcon(urls) {
  const promises = urls.map(
    (url) =>
      new Promise((resolve, _reject) => {
        fetchToDataURL(new URL(url))
          .then((data) => resolve(data))
          .catch(() => resolve(null));
      })
  );

  const resolvedUrls = await Promise.all(promises);

  return find(resolvedUrls, (url) => !!url);
}
