import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import balancesActions from 'shared/actions/balancesActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withAllNetworkData from 'shared/hocs/withAllNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import withConfirm from 'shared/hocs/withConfirm';
import withAlert from 'shared/hocs/withAlert';

import NetworkPanel from './NetworkPanel';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/currentNetworkActions';
import { setNetworks, addNetwork, clearNetworks } from '../../actions/networksActions';

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
)(NetworkPanel);
