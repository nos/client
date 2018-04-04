import { string, number, shape } from 'prop-types';

export default shape({
  scriptHash: string.isRequired,
  balance: string.isRequired,
  decimals: number.isRequired
});
