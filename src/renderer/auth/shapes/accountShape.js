import { string, number, shape } from 'prop-types';

export default shape({
  label: string.isRequired,
  encryptedMnemonic: string.isRequired,
  chainId: number.isRequired,
  index: number.isRequired,
  net: string.isRequired,
  secretWord: string.isRequired,
  mnemonic: string, // Unencrypted mnemonic not required for better security
  passphrase: string // Passphrase not required in the case when signing in
});
