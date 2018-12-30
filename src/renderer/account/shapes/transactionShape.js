import { string, shape } from 'prop-types';

import balanceShape from './balanceShape';

export default shape({
  to: string.isRequired,
  from: string.isRequired,
  amount: string.isRequired,
  label: string.isRequired,
  asset: balanceShape.isRequired,
  txId: string.isRequired
});
