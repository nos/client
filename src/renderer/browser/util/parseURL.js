import { URL } from 'whatwg-url';
import { filter, isEmpty, trim } from 'lodash';

import { HTTP, CUSTOM_PROTOCOLS } from '../values/protocols';

function getTLD(query) {
  const tldProvided = query
    .split(/[/?]/)[0]
    .split('.')
    .pop();
  const tld = filter(CUSTOM_PROTOCOLS, (protocol) => tldProvided === protocol.tld);
  return isEmpty(tld) ? HTTP : tld[0].protocol;
}

export default function parseURL(query) {
  const trimmedQuery = trim(query);

  if (trimmedQuery.includes('://')) {
    return new URL(trimmedQuery);
  }

  const tld = getTLD(trimmedQuery);
  const url = `${tld}//${trimmedQuery}`;

  try {
    return new URL(url);
  } catch (err) {
    return new URL(`https://duckduckgo.com/?q=${encodeURIComponent(trimmedQuery)}`);
  }
}
