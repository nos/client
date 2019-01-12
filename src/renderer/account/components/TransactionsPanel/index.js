import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';

import balancesActions from 'shared/actions/balancesActions';
import Failed from 'shared/components/Failed';

import TransactionPanel from './TransactionsPanel';
import TransactionsLoading from './TransactionsLoading';
import loaded from '../Account';

const { LOADING, LOADED, FAILED } = progressValues;

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withProgressComponents(
    balancesActions,
    {
      [LOADING]: TransactionsLoading,
      [LOADED]: TransactionsLoading,
      [FAILED]: Failed
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),

  withData(balancesActions, mapBalancesDataToProps)
)(TransactionPanel);
