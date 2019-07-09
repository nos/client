import { string, number, shape, bool, objectOf, oneOfType } from 'prop-types';

const walletShapeInitialized = shape({
  accountId: string.isRequired,
  chainId: number.isRequired,
  index: number.isRequired,
  account: number.isRequired,
  change: number.isRequired,
  net: string.isRequired,
  publicKey: string.isRequired,
  address: string.isRequired,
  privateKey: string.isRequired,
  WIF: string.isRequired
});

const walletShapeNotInitialized = shape({
  accountId: string.isRequired,
  chainId: number.isRequired,
  index: number.isRequired,
  account: number.isRequired,
  change: number.isRequired,
  net: string.isRequired
});

export default shape({
  isHardware: bool.isRequired,
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  secretWord: string.isRequired,
  passphrase: string, // Will be removed when persisting to storage
  mnemonic: string, // Will be removed when persisting to storage
  activeWalletId: string.isRequired,
  wallets: oneOfType([objectOf(walletShapeInitialized), objectOf(walletShapeNotInitialized)])
});
