import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';

import App from './App';
import Loading from '../Loading';
import currentNetworkActions from '../../actions/settings/currentNetworkActions';
import getAllNetworks from '../../actions/settings/networksActions';
import withInitialCall from '../../hocs/withInitialCall';
import withProgressChange from '../../hocs/withProgressChange';
import updateNetworks from '../../util/updateNetworks';

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
