import { drop, some, startsWith, split, trim, trimEnd, endsWith } from 'lodash';

const TLDs = ['.neo', '.neoo'];
const protocols = {
  http: 'http:',
  https: 'https:',
  nos: 'nos:'
};
const defaultProtocol = protocols.https;

function determineHttp(urlQuery) {
  return urlQuery.protocol === protocols.nos
    ? Object.assign(urlQuery, { protocol: defaultProtocol })
    : urlQuery;
}

// No protocol?         --> append protocol depending on TLD

// custom TLD?          --> modify protocol
// No custom TLD?       --> don't modify tld/protocol

export default function parseURL(query) {
  try {
    const trimmedQuery = trimEnd(trim(query), '/');
    const containsCustomTLD = some(TLDs, (tld) => endsWith(trimmedQuery, tld));
    const containsProtocol = some(protocols, (protocol) => startsWith(trimmedQuery, protocol));

    const formattedQuery = !containsProtocol ? `${defaultProtocol}//${trimmedQuery}` : trimmedQuery;
    console.log(formattedQuery);

    const urlQuery = new URL(trimmedQuery);
    console.log('urlQuery', urlQuery);
    return containsCustomTLD
      ? Object.assign(urlQuery, { protocol: protocols.nos })
      : determineHttp(urlQuery);
  } catch (e) {
    console.log('error', e);
  }
}
