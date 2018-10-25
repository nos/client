import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';

import Failed from 'shared/components/Failed';
import Loading from 'shared/components/Loading';

import withInitialCall from 'shared/hocs/withInitialCall';

import authActions from 'login/actions/authActions';

import { withInfoToast } from 'shared/hocs/withToast';

import withNetworkData from 'shared/hocs/withNetworkData';

import transactionHistoryActions from '../../../actions/transactionHistoryActions';

import Transactions from './Transactions';

const { LOADING } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });
const mapTransactionHistoryActions = (transactions) => transactions;

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withData(transactionHistoryActions, mapTransactionHistoryActions),
  // withProgressComponents(
  //   transactionHistoryActions,
  //   {
  //     [LOADING]: Loading
  //   },
  //   {
  //     strategy: alreadyLoadedStrategy
  //   }
  // ),
  withInfoToast()
)(Transactions);
