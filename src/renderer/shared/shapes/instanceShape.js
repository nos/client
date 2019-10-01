import { number, string, shape } from 'prop-types';

export default shape({
  privateKey: string.isRequired,
  publicKey: string.isRequired,
  address: string.isRequired,
  wif: string.isRequired,
  type: string.isRequired,
  index: number.isRequired
});
