import { compose } from 'recompose';
import { withActions, withData } from 'spunky';
import withInitialCall from '../../hocs/withInitialCall';

import Settings from './Settings';
import { getCurrentNetwork, setCurrentNetwork } from '../../actions/settings/currentNetworkActions';

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: (params) => {
    return actions.call(params);
  }
});

const mapCurrentNetworkDataToProps = (data) => {
  return { currentNetwork: (data && data.currentNetwork) || '' };
};

export default compose(
  withInitialCall(getCurrentNetwork),
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withData(getCurrentNetwork, mapCurrentNetworkDataToProps)
)(Settings);
