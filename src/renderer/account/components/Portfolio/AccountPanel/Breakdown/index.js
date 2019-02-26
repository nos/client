import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { sortBy } from 'lodash';

import Breakdown from './Breakdown';
import BreakdownLoading from './BreakdownLoading';
import calculateTokenValue from '../../../../util/calculateTokenValue';

import loaded from '../index';
import balanceWithPricesActions from '../../../../actions/balanceWithPricesActions';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalanceWithPricesToProps = ({ balances, prices }) => ({ balances, prices });

const mapSortedBalances = (props) => ({
  balances: sortBy(props.balances, (token) => -calculateTokenValue(token, props.prices))
});

export default compose(
  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([balancesActions, pricesActions], { ... })
  withProgressComponents(
    balanceWithPricesActions,
    {
      [LOADING]: BreakdownLoading,
      [LOADED]: loaded,
      [FAILED]: BreakdownLoading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(balanceWithPricesActions, mapBalanceWithPricesToProps),

  withProps(mapSortedBalances)
)(Breakdown);
