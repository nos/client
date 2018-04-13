import { compose } from 'recompose';
import { withActions, withData, progressValues } from 'spunky';

import Settings from './Settings';
import authActions from '../../actions/authActions';
import balancesActions from '../../actions/balancesActions';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/settings/currentNetworkActions';
import withNetworkData from '../../hocs/withNetworkData';
import withProgressChange from '../../hocs/withProgressChange';

const { LOADED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesActionsToProps = (actions, { currentNetwork, address }) => ({
  fetchBalances: () => actions.call({ net: currentNetwork, address })
});

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

export default compose(
  // Pass in props and actions around displaying/changing network
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withNetworkData('currentNetwork'),

  // Load balance data whenever the network is assigned or changed
  withData(authActions, mapAuthDataToProps),
  withActions(balancesActions, mapBalancesActionsToProps),
  withProgressChange(currentNetworkActions, LOADED, (state, { fetchBalances }) => fetchBalances())
)(Settings);
