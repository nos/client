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

import withActiveWallet from 'shared/hocs/withActiveWallet';
import withNetworkData from 'shared/hocs/withNetworkData';

import transactionHistoryActions from '../../../../actions/transactionHistoryActions';

import Transactions from './Transactions';

const { LOADING, FAILED } = progressValues;

const mapTransactionHistoryDataToProps = (transactionHistory) => ({
  transactionHistory
});
const mapTransactionHistoryActionsToProps = (actions, props) => ({
  handleFetchAdditionalTxData: (previousCall) =>
    actions.call({
      net: props.net,
      address: props.address,
      coinType: props.coinType,
      previousCall
    })
});

export default compose(
  withNetworkData(),
  withActiveWallet(),
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
