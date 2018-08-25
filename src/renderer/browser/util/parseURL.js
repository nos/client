import { noop, filter, isEmpty, some, startsWith, trim, trimEnd, endsWith } from 'lodash';

const protocols = {
  http: {
    tld: noop,
    protocol: 'http:'
  },
  https: {
    tld: noop,
    protocol: 'https:'
  },
  nos: {
    tld: '.neo',
    protocol: 'nos:'
  }
};

function checkLocalhost(tldToApply, trimmedQuery) {
  if (trimmedQuery.includes('localhost:')) {
    return `${protocols.http.protocol}//${trimmedQuery}`;
  } else {
    return `${tldToApply.protocol}//${trimmedQuery}`;
  }
}

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(protocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? protocols.https : tld[0];

  return some(protocols, (protocol) => startsWith(trimmedQuery, protocol.protocol))
    ? new URL(`${tldToApply.protocol}//${trimmedQuery}`)
    : new URL(checkLocalhost(tldToApply, trimmedQuery));
}
