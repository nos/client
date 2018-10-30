import { withProps } from 'recompose';
import { sortBy } from 'lodash';

import { NOS, NEO, GAS } from 'shared/values/assets';

import Holdings from './Holdings';

/**
 * Sort by:
 * 1. preferred tokens
 * 2. token symbol (ascending)
 */
const customSort = (balances, preferredOrder) => {
  return sortBy(balances, (token) => {
    const precidence = preferredOrder.findIndex((v) => v === token.scriptHash);

    return [
      precidence < 0 ? Infinity : precidence,
      token.symbol
    ];
  });
};

const sortBalances = ({ balances }) => ({
  balances: customSort(balances, [NOS, NEO, GAS])
});

export default withProps(sortBalances)(Holdings);
