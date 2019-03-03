import { string, shape } from 'prop-types';

export default shape({
  walletName: string.isRequired,
  encryptedKey: string.isRequired,
  passphrase: string.isRequired,
  address: string.isRequired,
  key: string // Private key not required in the case when signing in
});
