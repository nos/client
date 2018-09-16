import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';
import { map, difference } from 'lodash';

import balancesActions from 'shared/actions/balancesActions';
import blockActions from 'shared/actions/blockActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withAllNetworkData from 'shared/hocs/withAllNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import withConfirm from 'shared/hocs/withConfirm';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import NetworkSettings from './NetworkSettings';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/currentNetworkActions';
import getAllNetworks, { addNetwork, clearNetworks } from '../../actions/networksActions';

const { LOADED, FAILED } = progressValues;

const mapBalancesActionsToProps = (actions) => ({
  resetBalancesData: actions.reset
});

const mapBlockActionsToProps = (actions) => ({
  resetBlockData: actions.reset
});

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

const mapAddNetworksActionsToProps = (actions) => ({
  addNetwork: actions.call
});

const mapClearNetworksActionsToProps = (actions) => ({
  clearNetworks: actions.call
});

export default compose(
  // Pass in props and actions around displaying/changing network
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withActions(addNetwork, mapAddNetworksActionsToProps),
  withActions(clearNetworks, mapClearNetworksActionsToProps),
  withActions(blockActions, mapBlockActionsToProps),

  // Get network settings data
  withAllNetworkData(),
  withNetworkData('currentNetwork'),

  // Load balance data whenever the network is assigned or changed
  withActions(balancesActions, mapBalancesActionsToProps),
  withProgressChange(currentNetworkActions, [LOADED, FAILED], (state, props) => {
    props.resetBalancesData();
    props.resetBlockData();
  }),

  // Change to new network whenever a new one is added
  withProgressChange(getAllNetworks, LOADED, (state, props, prevProps) => {
    const originalNetworkNames = map(prevProps.networks, 'name');
    const updatedNetworkNames = map(props.networks, 'name');
    const newNetworks = difference(updatedNetworkNames, originalNetworkNames);

    if (newNetworks.length > 0) {
      props.setCurrentNetwork(newNetworks[0]);
    }
  }),

  // Dialog
  withConfirm(),

  // State for modal
  withState('networkName', 'setNetworkName', ''),
  withState('networkUrl', 'setNetworkUrl', ''),

  // Messaging
  withSuccessToast(),
  withProgressChange(setCurrentNetwork, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),
  withProgressChange(addNetwork, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),

  withErrorToast(),
  withProgressChange(setCurrentNetwork, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  })
)(NetworkSettings);
