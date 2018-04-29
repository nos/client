import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import Settings from './Settings';
import balancesActions from '../../actions/balancesActions';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/settings/currentNetworkActions';
import { setNetworks, addNetwork, clearNetworks } from '../../actions/settings/networksActions';
import withNetworkData from '../../hocs/withNetworkData';
import withAllNetworkData from '../../hocs/withAllNetworkData';
import withProgressChange from '../../hocs/withProgressChange';
import withConfirm from '../../hocs/withConfirm';
import withAlert from '../../hocs/withAlert';

const { LOADED, FAILED } = progressValues;

const mapBalancesActionsToProps = (actions) => ({
  resetAccountData: actions.reset
});

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

const mapNetworksActionsToProps = (actions) => ({
  setNetworks: actions.call
});

const mapAddNetworksActionsToProps = (actions) => ({
  addNetwork: actions.call
});

const mapClearNetworksActionsToProps = (actions) => ({
  clearNetworks: actions.call
});

export default
compose(
  // Pass in props and actions around displaying/changing network
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withActions(setNetworks, mapNetworksActionsToProps),
  withActions(addNetwork, mapAddNetworksActionsToProps),
  withActions(clearNetworks, mapClearNetworksActionsToProps),

  // Get network settings data
  withAllNetworkData(),
  withNetworkData('currentNetwork'),

  // Load balance data whenever the network is assigned or changed
  withActions(balancesActions, mapBalancesActionsToProps),
  withProgressChange(currentNetworkActions, [LOADED, FAILED], (state, { resetAccountData }) => {
    resetAccountData();
  }),

  // Alerts and dialogs
  withConfirm(),
  withAlert(),

  // State for modal
  withState('networkName', 'setNetworkName', ''),
  withState('networkUrl', 'setNetworkUrl', ''),
)(Settings);
