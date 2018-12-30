import { string, number, shape } from 'prop-types';

export default shape({
  scriptHash: string.isRequired,
  name: string.isRequired,
  symbol: string.isRequired,
  decimals: number.isRequired,
  balance: string,
  image: string,
  totalSupply: number
});
