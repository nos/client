import { string, objectOf, shape } from 'prop-types';

import accountShape from './accountShape';

export default objectOf(
  shape({
    [string]: accountShape
  })
);
