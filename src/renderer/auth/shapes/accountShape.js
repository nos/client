import { string, number, shape, bool, objectOf, oneOf } from 'prop-types';

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
  isLedger: bool.isRequired,
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  secretWord: string.isRequired,
  passphrase: string, // Will be removed when persisting to storage
  mnemonic: string, // Will be removed when persisting to storage
  activeAccountId: string.isRequired, // TODO rename to activeWalletId
  accounts: oneOf(
    objectOf(walletShapeInitialized),
    objectOf(walletShapeNotInitialized)
  )
});
