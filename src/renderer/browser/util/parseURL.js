import { filter, isEmpty, trim, trimEnd, endsWith } from 'lodash';

import { PROTOCOLS, CUSTOM_PROTOCOLS} from '../values/protocols';

export default function parseURL(query) {
  const trimmedQuery = trimEnd(trim(query), '/').split('://').pop();

  const tld = filter(CUSTOM_PROTOCOLS, (protocol) => endsWith(trimmedQuery, protocol.tld));
  const tldToApply = isEmpty(tld) ? PROTOCOLS.http : tld[0].protocol;

  return new URL(`${tldToApply}//${trimmedQuery}`);
}
