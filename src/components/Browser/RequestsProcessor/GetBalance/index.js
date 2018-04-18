import { compose, withProps } from 'recompose';
import { withCall, withData } from 'spunky';

import GetBalance from './GetBalance';
import authActions from '../../../../actions/authActions';
import balancesActions from '../../../../actions/dapps/makeBalancesAction';
import withNetworkData from '../../../../hocs/withNetworkData';
import withNullLoader from '../../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapBalancesDataToProps = (balances) => ({ balances });

export default function makeGetBalance() {
  return compose(
    // Get the current network & account address
    withNetworkData(),

    // Map auth data
    withData(authActions, mapAuthDataToProps),

    // Get the 2nd optional parameter (default = address)
    withProps(({ args, address }) => ({
      address: args.length >= 2 ? args[1] : address
    })),

    // Get the balance & wait for success or failure
    withCall(balancesActions, ({ net, address }) =>
      ({ net, address })),
    withNullLoader(balancesActions),
    withRejectMessage(balancesActions, 'Your account balance could not be retrieved.'),
    withData(balancesActions, mapBalancesDataToProps)
  )(GetBalance);
}
