import { string, shape } from 'prop-types';

export default shape({
  walletName: string.isRequired,
  encryptedKey: string.isRequired,
  address: string.isRequired,
  passphrase: string, // Passphrase not required in the case when signing in
  key: string // Private key not required in the case when signing in
});
