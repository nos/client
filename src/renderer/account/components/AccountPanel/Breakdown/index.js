import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { sortBy } from 'lodash';

import Failed from 'shared/components/Failed';

import withInitialCall from 'shared/hocs/withInitialCall';
import balancesActions from 'shared/actions/balancesActions';
import pricesActions from 'account/actions/pricesActions';

import Breakdown from './Breakdown';
import BreakdownLoading from './BreakdownLoading';
import calculateTokenValue from '../../../util/calculateTokenValue';

import loaded from '../../Account';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesDataToProps = (balances) => ({ balances });
const mapPricesDataToProps = (prices) => ({ prices });

const mapSortedBalances = (props) => ({
  balances: sortBy(props.balances, (token) => -calculateTokenValue(token, props.prices))
});

export default compose(
  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([balancesActions, pricesActions], { ... })
  withProgressComponents(
    balancesActions,
    {
      [LOADING]: BreakdownLoading,
      [LOADED]: loaded,
      [FAILED]: Failed
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(balancesActions, mapBalancesDataToProps),

  withInitialCall(pricesActions, ({ currency, balances }) => ({ currency, balances })),
  withProgressComponents(
    pricesActions,
    {
      [LOADING]: BreakdownLoading,
      [LOADED]: loaded,
      [FAILED]: Failed
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(pricesActions, mapPricesDataToProps),

  withProps(mapSortedBalances)
)(Breakdown);
