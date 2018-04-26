import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import { withActions, progressValues } from 'spunky';

import Settings from './Settings';
import balancesActions from '../../actions/balancesActions';
import currentNetworkActions, { setCurrentNetwork, setNetworks, addNetwork, clearNetworks } from '../../actions/settings/currentNetworkActions';
import withNetworkData, { withAllNetworkData } from '../../hocs/withNetworkData';
import withProgressChange from '../../hocs/withProgressChange';
import { set_current_network } from '../../actions/settings/currentNetworkActions';
import { withNetworkActions } from '../../hocs/withNetwork';
import withConfirm from '../../hocs/withConfirm';

const mapStateToProps = (state) => ({
  network: state.currentNetwork
});

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
  connect(mapStateToProps),
  withNetworkActions(),
  // Pass in props and actions around displaying/changing network
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withActions(setNetworks, mapNetworksActionsToProps),
  withActions(addNetwork, mapAddNetworksActionsToProps),
  withActions(clearNetworks, mapClearNetworksActionsToProps),
  withAllNetworkData(),
  withNetworkData('currentNetwork'),

  // Load balance data whenever the network is assigned or changed
  withActions(balancesActions, mapBalancesActionsToProps),
  withProgressChange(currentNetworkActions, [LOADED, FAILED], (state, { resetAccountData }) => {
    resetAccountData();
  }),

  //Alerts and dialogs
  withConfirm(),
  withState('networkName', 'setNetworkName', ''),
  withState('networkUrl', 'setNetworkUrl', '')
)(Settings);
