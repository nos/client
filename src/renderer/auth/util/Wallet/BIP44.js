import { includes } from 'lodash';

import { CHAIN_IDS } from 'shared/values/chains';

const deriveWallet = (type, index, account = 0, change = 0) => {
  if (!includes(CHAIN_IDS, type)) throw new Error('No valid chain type was given.');

  return this.root
    .deriveHardened(44) // Purpose (bip44)
    .deriveHardened(type) // Coin type https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    .deriveHardened(account) // Account (different account levels)
    .derive(change) // Change (0 = external/public view, 1 = internal chain/private view)
    .derive(index); // Address index
};

// eslint-disable-next-line
export { deriveWallet };
