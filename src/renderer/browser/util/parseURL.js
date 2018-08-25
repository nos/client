import { defaultTo, noop, filter, isEmpty, forEach, reduce, some, startsWith, split, trim, trimEnd, endsWith } from 'lodash';

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
  try {
    const trimmedQuery = trimEnd(trim(query), '/');

    const tld = filter(protocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
    const tldToApply = isEmpty(tld) ? protocols.https : tld[0];

    return some(protocols, (protocol) => startsWith(trimmedQuery, protocol.protocol))
      ? new URL(trimmedQuery)
      : new URL(`${tldToApply.protocol}//${trimmedQuery}`);
  } catch (e) {
    console.log('error', e);
  }
}
