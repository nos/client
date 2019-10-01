import { string, objectOf, shape } from 'prop-types';

import walletShape from './walletShape';

export default objectOf(
  shape({
    [string]: walletShape
  })
);
