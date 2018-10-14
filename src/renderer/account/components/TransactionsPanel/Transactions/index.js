import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import { withInfoToast } from 'shared/hocs/withToast';

import withNetworkData from 'shared/hocs/withNetworkData';

import transactionHistoryActions from '../../../actions/transactionHistoryActions';

import Transactions from './Transactions';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapTransactionHistoryActions = (transactions) => ({ transactions: transactions || [] });

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withData(transactionHistoryActions, mapTransactionHistoryActions),
  withInfoToast()
)(Transactions);
