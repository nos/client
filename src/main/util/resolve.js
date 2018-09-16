import isDev from 'electron-is-dev';
import path from 'path';
import { resolve as resolveURL, format as formatURL } from 'url';
import { api, rpc, u } from '@cityofzion/neon-js';

import updateNetworks from 'util/updateNetworks';

// TODO: Configurable network
import { NOS_TESTNET } from 'values/networks';

import getStaticPath from './getStaticPath';

// TODO: Configurable script hash
const NS_SCRIPT_HASH = 'a2d2b79ba7620a8808f7f7679a8e2ab1bcc62bce';

updateNetworks();

function isNOS(url) {
  return url.host === 'nos.neo';
}

function isLocal(url) {
  return /^(localhost|127.0.0.1|0.0.0.0|::1)/.test(url.host);
}

function resolveNOS(url) {
  const { pathname } = url;
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

function resolveLocal(url) {
  const { host, pathname } = url;
  return `http://${host}${pathname}`;
}

async function resolveNameService(url) {
  const { host, pathname } = url;

  const endpoint = await api.getRPCEndpointFrom({ net: NOS_TESTNET }, api.neoscan);
  const client = new rpc.RPCClient(endpoint);
  const storageKey = u.str2hexstring(`${host}.target`);
  const response = await client.getStorage(NS_SCRIPT_HASH, storageKey);

  if (!response) {
    throw new Error('Not found.');
  }

  const target = u.hexstring2str(response);

  return `${target}${pathname}`;
}

export default async function resolve(url) {
  if (isNOS(url)) {
    return resolveNOS(url);
  }

  if (isLocal(url)) {
    return resolveLocal(url);
  }

  return resolveNameService(url);
}
