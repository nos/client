import { filter, isEmpty, trim, trimEnd, endsWith } from 'lodash';

import { protocols, customProtocols } from '../values/protocols';

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(customProtocols, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? protocols.http : tld[0].protocol;

  return new URL(`${tldToApply}//${trimmedQuery}`);
}
