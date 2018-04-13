import { compose } from 'recompose';
import { withActions, withData } from 'spunky';

import Settings from './Settings';
import currentNetworkActions, { setCurrentNetwork } from '../../actions/settings/currentNetworkActions';

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

const mapCurrentNetworkDataToProps = (currentNetwork) => ({ currentNetwork });

export default compose(
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withData(currentNetworkActions, mapCurrentNetworkDataToProps)
)(Settings);
