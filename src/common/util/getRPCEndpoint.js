import fetch from 'node-fetch';
import { rpc, settings } from '@cityofzion/neon-js';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

const BLACKLIST_URL = 'https://raw.githubusercontent.com/nos/rpc-status/master/blacklist.json';

let cachedRPC = null;
let cachedBlacklist = null;

function getNeoscanAPIEndpoint(net) {
  if (settings.networks[net]) {
    return settings.networks[net].extra.neoscan;
  }

  return net;
}

function getAPIEndpoint(net) {
  if (net === 'MainNet') {
    return 'https://nos-node-proxy.edgeapp.net';
  }

  const endpoint = getNeoscanAPIEndpoint(net);
  return `${endpoint}/v1/get_all_nodes`;
}

async function fetchBlacklist() {
  if (cachedBlacklist) {
    return cachedBlacklist;
  }

  try {
    const response = await fetch(BLACKLIST_URL, { agent: httpsAgent });
    cachedBlacklist = await response.json();
    return cachedBlacklist;
  } catch (err) {
    console.error('Unable to fetch RPC blacklist:', err); // eslint-disable-line no-console
    return [];
  }
}

function isUnreliableNode(url, blacklist) {
  return blacklist.some((item) => url.includes(item));
}

function raceToSuccess(promises) {
  return Promise.all(
    promises.map((p) =>
      // If a request fails, count that as a resolution so it will keep
      // waiting for other possible successes. If a request succeeds,
      // treat it as a rejection so Promise.all immediately bails out.
      p.then(
        (val) => Promise.reject(val),
        (err) => err
      )
    )
  ).then(
    // If '.all' resolved, we've just got an array of errors.
    (errors) => Promise.reject(errors),
    // If '.all' rejected, we've got the result we wanted.
    (val) => val
  );
}

export default async function getRPCEndpoint(net) {
  const apiEndpoint = getAPIEndpoint(net);
  const response = await fetch(apiEndpoint, { agent: httpsAgent });
  const data = await response.json();
  let nodes = data.sort((a, b) => b.height - a.height);

  if (settings.httpsOnly) {
    nodes = nodes.filter((n) => n.url.includes('https://'));
  }

  const blacklist = await fetchBlacklist();
  const goodNodes = nodes.filter((n) => !isUnreliableNode(n.url, blacklist));

  if (goodNodes.length === 0) {
    throw new Error('No eligible nodes found!');
  }

  const heightThreshold = goodNodes[0].height - 1;
  const highestNodes = goodNodes.filter((n) => n.height >= heightThreshold);
  const urls = highestNodes.map((n) => n.url);

  if (urls.length === 0) {
    throw new Error('No eligible nodes found!');
  }

  if (urls.includes(cachedRPC)) {
    return new rpc.RPCClient(cachedRPC).ping().then((num) => {
      if (num <= settings.timeout.ping) return cachedRPC;
      cachedRPC = null;
      return getRPCEndpoint(net);
    });
  }

  const clients = urls.map((u) => new rpc.RPCClient(u));

  const fastestUrl = await raceToSuccess(clients.map((c) => c.ping().then(() => c.net)));
  cachedRPC = fastestUrl;
  return fastestUrl;
}
