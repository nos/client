import {compose} from 'recompose';
import {withCall, withData} from 'spunky';

import GetBalance from './GetBalance';
import authActions from '../../../actions/authActions';
import balancesActions from '../../../actions/balancesActions';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({address}) => ({address});

const mapBalancesDataToProps = (balances) => ({balances});

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(balancesActions, mapBalancesDataToProps),
  withCall(balancesActions, ({address}) => ({address, net: 'TestNet'})),
  withNullLoader(balancesActions),
  withRejectMessage(balancesActions, 'Your account balance could not be retrieved.')
)(GetBalance);
