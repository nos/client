import { string, shape, bool, oneOfType } from 'prop-types';

export const registerMnemonicShape = shape({
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

export default oneOfType([
  registerMnemonicShape,
  registerLedgerShape
]);
