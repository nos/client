import isDev from 'electron-is-dev';
import path from 'path';
import { resolve as resolveURL, format as formatURL } from 'url';
import { rpc, u } from '@cityofzion/neon-js';

import getStaticPath from 'util/getStaticPath';

// TODO: Configurable network settings and script hash
const NS_SCRIPT_HASH = 'a2d2b79ba7620a8808f7f7679a8e2ab1bcc62bce';
const RPC_URL = 'http://testnet.nos.io:30333';

function isNOS(host) {
  return host === 'nos.neo';
}

function isLocal(host) {
  return /^(localhost|127.0.0.1|0.0.0.0|::1)/.test(host);
}

export default async function resolve(url) {
  const { host, pathname } = url;

  if (isNOS(host)) {
    const filename = pathname === '/' ? 'welcome.html' : pathname;

    if (isDev) {
      return resolveURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`, filename);
    } else {
      return formatURL({
        pathname: path.join(getStaticPath(), filename),
        protocol: 'file:',
        slashes: false
      });
    }
  }

  if (isLocal(host)) {
    return `http://${host}${pathname}`;
  }

  const client = new rpc.RPCClient(RPC_URL);
  const storageKey = u.str2hexstring(`${host}.target`);
  const response = await client.getStorage(NS_SCRIPT_HASH, storageKey);

  if (!response) {
    throw new Error('Not found.');
  }

  const target = u.hexstring2str(response);

  return `${target}${pathname}`;
}
