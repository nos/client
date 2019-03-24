import { string, shape } from 'prop-types';

export default shape({
  label: string.isRequired,
  encryptedMnemonic: string.isRequired,
  chainId: string.isRequired,
  index: string.isRequired,
  net: string.isRequired,
  secretWord: string.isRequired,
  mnemonic: string, // Unencrypted mnemonic not required for better security
  passphrase: string // Passphrase not required in the case when signing in
});
