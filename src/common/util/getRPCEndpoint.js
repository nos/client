import fetch from 'node-fetch';
import { rpc, settings } from '@cityofzion/neon-js';

let cachedRPC = null;

function getAPIEndpoint(net) {
  if (settings.networks[net]) {
    return settings.networks[net].extra.neoscan;
  }

  return net;
}

function isUnreliableNode(url) {
  return url.match(/redpulse\.com/i) ||
    url.match(/ddns\.net/i) ||
    url.match(/neeeo\.org/i) ||
    url.match(/otcgo\.cn/i) ||
    url.match(/seed1\.aphelion-neo\.com/i);
}

function raceToSuccess(promises) {
  return Promise.all(
    promises.map((p) => (
      // If a request fails, count that as a resolution so it will keep
      // waiting for other possible successes. If a request succeeds,
      // treat it as a rejection so Promise.all immediately bails out.
      p.then((val) => Promise.reject(val), (err) => err)
    ))
  ).then(
    // If '.all' resolved, we've just got an array of errors.
    (errors) => Promise.reject(errors),
    // If '.all' rejected, we've got the result we wanted.
    (val) => val
  );
}

export default async function getRPCEndpoint(net) {
  const apiEndpoint = getAPIEndpoint(net);
  const response = await fetch(`${apiEndpoint}/v1/get_all_nodes`);
  const data = await response.json();
  let nodes = data.sort((a, b) => b.height - a.height);

  if (settings.httpsOnly) {
    nodes = nodes.filter((n) => n.url.includes('https://'));
  }

  if (nodes.length === 0) {
    throw new Error('No eligible nodes found!');
  }

  const heightThreshold = nodes[0].height - 1;
  const goodNodes = nodes.filter((n) => n.height >= heightThreshold);
  const urls = goodNodes.map((n) => n.url).filter((url) => !isUnreliableNode(url));

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
