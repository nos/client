import { string, objectOf, shape } from 'prop-types';

import accountShape from './accountShape';

// TODO is this used??
export default objectOf(
  shape({
    [string]: accountShape
  })
);
