import { compose } from 'recompose';
import {
  withData,
  withCall,
  withProgressComponents,
  progressValues,
  alreadyLoadedStrategy,
  withActions
} from 'spunky';

import Failed from 'shared/components/Failed';
import Loading from 'shared/components/Loading';

import authActions from 'auth/actions/authActions';

import withNetworkData from 'shared/hocs/withNetworkData';

import transactionHistoryActions from '../../../../actions/transactionHistoryActions';

import Transactions from './Transactions';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });
const mapTransactionHistoryDataToProps = (transactionHistory) => ({ transactionHistory });
const mapTransactionHistoryActionsToProps = (actions, props) => ({
  handleFetchAdditionalTxData: (previousCall) => actions.call({
    net: props.net,
    address: props.address,
    previousCall
  })
});

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withActions(transactionHistoryActions, mapTransactionHistoryActionsToProps),

  withCall(transactionHistoryActions),
  withProgressComponents(
    transactionHistoryActions,
    {
      [LOADING]: Loading,
      [FAILED]: Failed
    },
    {
      strategy: alreadyLoadedStrategy
    }
  ),
  withData(transactionHistoryActions, mapTransactionHistoryDataToProps)
)(Transactions);
