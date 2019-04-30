import { string, number, shape, bool, objectOf } from 'prop-types';

const oldShape = shape({
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  chainId: number.isRequired,
  index: number.isRequired,
  net: string.isRequired,
  secretWord: string.isRequired,
  mnemonic: string, // Unencrypted mnemonic not required for better security
  passphrase: string // Passphrase not required in the case when signing in
});

const walletShape = shape({
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

export default shape({
  isLedger: bool.isRequired,
  accountLabel: string.isRequired,
  encryptedMnemonic: string.isRequired,
  secretWord: string.isRequired,
  passphrase: string, // Will be removed when persisting to storage
  mnemonic: string, // Will be removed when persisting to storage
  activeAccountId: string.isRequired, // TODO rename to activeWalletId
  accounts: objectOf(walletShape)
});

/**
 *     [activeAccountId]: {
      accountId: activeAccountId,
      chainId: DEFAULT_CHAIN,
      index: DEFAULT_ACC_INDEX,
      account: 0,
      change: 0,
      net: DEFAULT_NET
    },
    [ethAccountId]: {
      accountId: ethAccountId,
      chainId: CHAINS.ETH,
      index: DEFAULT_ACC_INDEX,
      account: 0,
      change: 0,
      net: DEFAULT_NET
    }
 */
