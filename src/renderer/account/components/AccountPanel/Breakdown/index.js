import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { sortBy } from 'lodash';

import Failed from 'shared/components/Failed';

import balancesActions from 'shared/actions/balancesActions';
import pricesActions from 'account/actions/pricesActions';

import Breakdown from './Breakdown';
import BreakdownLoading from './BreakdownLoading';
import calculateTokenValue from '../../../util/calculateTokenValue';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesDataToProps = (balances) => ({ balances });
const mapPricesDataToProps = (prices) => ({ prices });

const mapSortedBalances = (props) => ({
  balances: sortBy(props.balances, (token) => -calculateTokenValue(token, props.prices))
});

export default compose(
  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([balancesActions, pricesActions], { ... })
  ...([balancesActions, pricesActions].map((actions) => {
    return withProgressComponents(actions, {
      [LOADING]: BreakdownLoading,
      [LOADED]: BreakdownLoading,
      [FAILED]: Failed
    }, {
      strategy: alreadyLoadedStrategy
    });
  })),

  withData(balancesActions, mapBalancesDataToProps),
  withData(pricesActions, mapPricesDataToProps),

  withProps(mapSortedBalances)
)(Breakdown);
