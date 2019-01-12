import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { sortBy, pickBy, keys } from 'lodash';

import balancesActions from 'shared/actions/balancesActions';
import claimableActions from 'shared/actions/claimableActions';
import pricesActions from 'account/actions/pricesActions';
import Failed from 'shared/components/Failed';
import { ASSETS, NOS, NEO, GAS } from 'shared/values/assets';

import Holdings from './Holdings';
import HoldingsLoading from './HoldingsLoading';
import loaded from '../../Account';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesDataToProps = (balances) => ({
  balances: pickBy(balances, ({ scriptHash, balance }) => {
    return keys(ASSETS).includes(scriptHash) || scriptHash === NOS || balance !== '0';
  })
});

const mapClaimableDataToProps = (claimable) => ({ claimable });
const mapPricesDataToProps = (prices) => ({ prices });

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
  ...[claimableActions, balancesActions, pricesActions].map((actions) => {
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
  withData(balancesActions, mapBalancesDataToProps),
  withData(pricesActions, mapPricesDataToProps),

  withProps(sortBalances)
)(Holdings);
