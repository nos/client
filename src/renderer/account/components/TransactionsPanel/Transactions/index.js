import { compose } from 'recompose';
import {
  withData,
  withCall,
  withProgressComponents,
  progressValues,
  alreadyLoadedStrategy
} from 'spunky';

import Failed from 'shared/components/Failed';
import Loading from 'shared/components/Loading';

import authActions from 'login/actions/authActions';

import { withInfoToast } from 'shared/hocs/withToast';

import withNetworkData from 'shared/hocs/withNetworkData';

import transactionHistoryActions from '../../../actions/transactionHistoryActions';

import Transactions from './Transactions';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });
const mapTransactionHistoryActions = (transactionHistory) => ({ transactionHistory });

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),

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
  withData(transactionHistoryActions, mapTransactionHistoryActions),

  withInfoToast()
)(Transactions);
