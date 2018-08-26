import { filter, isEmpty, trim, trimEnd, endsWith } from 'lodash';

import { protocols, customProtocols } from '../values/protocols';

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(customProtocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? protocols.https : tld[0].protocol;

  const url = trimmedQuery.includes('localhost:')
    ? `${protocols.http}//${trimmedQuery}`
    : `${tldToApply}//${trimmedQuery}`;

  return new URL(url);
}
