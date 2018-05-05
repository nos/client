import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';

import App from './App';
import Loading from '../../shared/components/Loading';
import currentNetworkActions from '../../settings/actions/currentNetworkActions';
import getAllNetworks from '../../settings/actions/networksActions';
import withInitialCall from '../../shared/hocs/withInitialCall';
import withProgressChange from '../../shared/hocs/withProgressChange';
import updateNetworks from '../../shared/util/updateNetworks';

const { LOADING, LOADED } = progressValues;

const mapNetworksToProps = (networks) => ({ networks });

export default compose(
  withRouter,
  withInitialCall(currentNetworkActions),
  withInitialCall(getAllNetworks),
  withData(getAllNetworks, mapNetworksToProps),
  withProgressChange(getAllNetworks, LOADED, (state, { networks }) => updateNetworks(networks)),
  withProgressComponents(currentNetworkActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoadedStrategy
  })
)(App);
