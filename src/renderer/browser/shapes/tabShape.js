import { shape, string, number, bool, oneOf } from 'prop-types';

import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

export default shape({
  type: oneOf([INTERNAL, EXTERNAL]).isRequired,
  target: string.isRequired,
  addressBarEntry: bool.isRequired,
  requestCount: number.isRequired,
  errorCode: number,
  errorDescription: string
});
