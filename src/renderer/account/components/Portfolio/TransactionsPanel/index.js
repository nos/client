import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';

import TransactionPanel from './TransactionsPanel';
import loaded from '../index';
import TransactionsLoading from './TransactionsLoading';
import balanceWithPricesActions from '../../../actions/balanceWithPricesActions';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesWithPricesToProps = ({ balances, prices }) => ({ balances, prices });

export default compose(
  withProgressComponents(
    balanceWithPricesActions,
    {
      [LOADING]: TransactionsLoading,
      [LOADED]: loaded,
      [FAILED]: TransactionsLoading
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(balanceWithPricesActions, mapBalancesWithPricesToProps)
)(TransactionPanel);
