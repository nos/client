import { includes } from 'lodash';
import * as bip32 from 'bip32';

import { DEFAULT_COIN, COIN_TYPES } from 'shared/values/coins';

const deriveChild = ({ wallet, seed }) => {
  const { coinType, index, account, change } = wallet;
  if (!includes(COIN_TYPES, coinType)) throw new Error('No valid coin type was given.');
  const root = bip32.fromSeed(seed);

  return root
    .deriveHardened(44) // Purpose (bip44)
    .deriveHardened(coinType) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    .deriveHardened(account) // Account (different account levels)
    .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
    .derive(index); // Address index
};

function assertPositiveInteger(input, inputName) {
  if (!Number.isInteger(input) || input < 0) {
    throw new Error(`${input} is an invalid input for ${inputName}`);
  }
}

function to8BitHex(num) {
  const hex = num.toString(16);
  return '0'.repeat(8 - hex.length) + hex;
}

/**
 * Returns a BIP44 hex string.
 */
function BIP44({ address = 0, change = 0, account = 0, coinType = DEFAULT_COIN }) {
  assertPositiveInteger(address, 'address');
  assertPositiveInteger(change, 'change');
  assertPositiveInteger(account, 'account');
  assertPositiveInteger(coinType, 'coinType');
  const accountHex = to8BitHex(account + 0x80000000); // Hardened
  const coinTypeHex = to8BitHex(coinType + 0x80000000); // Hardened
  const changeHex = to8BitHex(change);
  const addressHex = to8BitHex(address);

  return [
    '8000002C', // Purpose (bip44)
    coinTypeHex, // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    accountHex, // Account (different account levels)
    changeHex, // Change (0 = external/public view, 1 = internal chain/private view)
    addressHex // Address index
  ].join('');
}

// eslint-disable-next-line
export { deriveChild, assertPositiveInteger, to8BitHex, BIP44 };
