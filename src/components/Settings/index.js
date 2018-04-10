import { compose } from 'recompose';
import { withActions, withData } from 'spunky';

import Settings from './Settings';
import { getCurrentNetwork, setCurrentNetwork } from '../../actions/settings/currentNetworkActions';

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: (params) => {
    return actions.call(params);
  }
});

const mapCurrentNetworkDataToProps = (data) => ({ currentNetwork: data && data.currentNetwork });

export default compose(
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withData(getCurrentNetwork, mapCurrentNetworkDataToProps)
)(Settings);
