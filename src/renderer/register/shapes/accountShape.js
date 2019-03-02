import { string, shape } from 'prop-types';

export default shape({
  walletName: string.isRequired,
  key: string.isRequired,
  encryptedKey: string.isRequired,
  passphrase: string.isRequired,
  address: string.isRequired
});
