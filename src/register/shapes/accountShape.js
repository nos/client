import { string, shape } from 'prop-types';

export default shape({
  key: string.isRequired,
  encryptedKey: string.isRequired,
  passphrase: string.isRequired,
  address: string.isRequired
});
