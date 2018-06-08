const path = require('path');
const { resolve: resolveURL, format: formatURL } = require('url');
const { rpc, u } = require('@cityofzion/neon-js');

// TODO: Configurable network settings and script hash
const NS_SCRIPT_HASH = '0xe60a3fa8149a853eb4dff4f6ed93c931646a9e22';
const RPC_URL = 'http://localhost:30333';

// https://cs.chromium.org/chromium/src/net/base/net_error_list.h
// const FILE_NOT_FOUND = -6;

function isNOS(host) {
  return host === 'nos.neo';
}

function isLocal(host) {
  return /^(localhost|127.0.0.1|0.0.0.0|::1)/.test(host);
}

async function resolve(url) {
  const { host, pathname } = url;

  if (isNOS(host)) {
    const filename = pathname === '/' ? 'welcome.html' : pathname;

    if (process.env.ELECTRON_START_URL) {
      return resolveURL(process.env.ELECTRON_START_URL, filename);
    } else {
      return formatURL({
        pathname: path.join(__dirname, filename),
        protocol: 'file:',
        slashes: true
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

module.exports = resolve;
