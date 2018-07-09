import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';

import Loading from 'shared/components/Loading';
import withInitialCall from 'shared/hocs/withInitialCall';
import withProgressChange from 'shared/hocs/withProgressChange';
import currentNetworkActions from 'settings/actions/currentNetworkActions';
import getAllNetworks from 'settings/actions/networksActions';

import App from './App';
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
