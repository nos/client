import { compose } from 'recompose';
import { withActions, progressValues } from 'spunky';

import Settings from './Settings';
import balancesActions from '../../actions/balancesActions';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/settings/currentNetworkActions';
import withNetworkData from '../../hocs/withNetworkData';
import withProgressChange from '../../hocs/withProgressChange';

const { LOADED, FAILED } = progressValues;

const mapBalancesActionsToProps = (actions) => ({
  resetAccountData: actions.reset
});

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

export default compose(
  // Pass in props and actions around displaying/changing network
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withNetworkData('currentNetwork'),

  // Load balance data whenever the network is assigned or changed
  withActions(balancesActions, mapBalancesActionsToProps),
  withProgressChange(currentNetworkActions, [LOADED, FAILED], (state, { resetAccountData }) => {
    resetAccountData();
  })
)(Settings);
