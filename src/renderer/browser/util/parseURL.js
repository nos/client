import { noop, filter, isEmpty, trim, trimEnd, endsWith } from 'lodash';

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

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(protocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? protocols.https : tld[0];

  const url = trimmedQuery.includes('localhost:')
    ? `${protocols.http.protocol}//${trimmedQuery}`
    : `${tldToApply.protocol}//${trimmedQuery}`;

  return new URL(url);
}
