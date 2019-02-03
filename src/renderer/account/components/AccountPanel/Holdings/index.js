import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { sortBy, pickBy, keys } from 'lodash';

import claimableActions from 'shared/actions/claimableActions';
import Failed from 'shared/components/Failed';
import { ASSETS, NOS, NEO, GAS } from 'shared/values/assets';

import loaded from '../index';

import Holdings from './Holdings';
import HoldingsLoading from './HoldingsLoading';
import balanceWithPricesActions from '../../../actions/balanceWithPricesActions';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalanceWithPricesToProps = ({ balances, prices }) => ({
  balances: pickBy(balances, ({ scriptHash, balance }) => {
    return keys(ASSETS).includes(scriptHash) || scriptHash === NOS || balance !== '0';
  }),
  prices
});

const mapClaimableDataToProps = (claimable) => ({ claimable });

/**
 * Sort by:
 * 1. preferred tokens
 * 2. token symbol (ascending)
 */
const customSort = (balances, preferredOrder) => {
  return sortBy(balances, (token) => {
    const precidence = preferredOrder.findIndex((v) => v === token.scriptHash);

    return [precidence < 0 ? Infinity : precidence, token.symbol];
  });
};

const sortBalances = ({ balances }) => ({
  balances: customSort(balances, [NOS, NEO, GAS])
});

export default compose(
  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([balancesActions, pricesActions], { ... })
  ...[claimableActions, balanceWithPricesActions].map((actions) => {
    return withProgressComponents(
      actions,
      {
        [LOADING]: HoldingsLoading,
        [LOADED]: loaded,
        [FAILED]: Failed
      },
      {
        strategy: alreadyLoadedStrategy
      }
    );
  }),

  withData(claimableActions, mapClaimableDataToProps),
  withData(balanceWithPricesActions, mapBalanceWithPricesToProps),

  withProps(sortBalances)
)(Holdings);
