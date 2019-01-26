import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';

import Failed from 'shared/components/Failed';

import TransactionPanel from './TransactionsPanel';
import loaded from '../Account';
import TransactionsLoading from './TransactionsLoading';
import balanceWithPricesActions from '../../actions/balanceWithPricesActions';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesWithPricesToProps = ({ balances, prices }) => ({ balances, prices });

export default compose(
  withProgressComponents(
    balanceWithPricesActions,
    {
      [LOADING]: TransactionsLoading,
      [LOADED]: loaded,
      [FAILED]: Failed
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(balanceWithPricesActions, mapBalancesWithPricesToProps)
)(TransactionPanel);
