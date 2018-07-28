import { session } from 'electron';

import pkg from '../../../package.json';

export default function injectHeaders() {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    const requestHeaders = {
      ...details.requestHeaders,
      'X-nOS-Version': pkg.version
    };
    callback({ cancel: false, requestHeaders });
  });
}
