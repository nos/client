import { string, arrayOf, shape } from 'prop-types';

import stackShape from './resultStackShape';

export default shape({
  script: string.isRequired,
  state: string.isRequired,
  gas_consumed: string.isRequired,
  stack: arrayOf(stackShape).isRequired
});
