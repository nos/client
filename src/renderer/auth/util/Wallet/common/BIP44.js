import { includes } from 'lodash';
import bip32 from 'bip32';

import { COIN_TYPES } from 'shared/values/coins';

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

// eslint-disable-next-line
export { deriveChild };
