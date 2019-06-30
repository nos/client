import { string, shape, bool } from 'prop-types';

export default shape({
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  isHardware: bool.isRequired,
  mnemonic: string.isRequired,
  passphrase: string.isRequired,
  passphraseConfirm: string.isRequired,
  secretWord: string.isRequired
});

export const registerLedgerShape = shape({
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  isHardware: bool.isRequired,
  mnemonic: string.isRequired,
  passphrase: string.isRequired,
  passphraseConfirm: string.isRequired,
  secretWord: string.isRequired,
  publicKey: string.isRequired
});
