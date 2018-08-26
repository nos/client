import { filter, isEmpty, trim, trimEnd, endsWith } from 'lodash';

const customProtocols = {
  nos: {
    tld: '.neo',
    protocol: 'nos:'
  }
};

const protocols = {
  https: 'https:',
  http: 'http:'
};

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(customProtocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? protocols.https : tld[0].protocol;

  const url = trimmedQuery.includes('localhost:')
    ? `${protocols.http}//${trimmedQuery}`
    : `${tldToApply}//${trimmedQuery}`;

  return new URL(url);
}
