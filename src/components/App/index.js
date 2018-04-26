import { compose } from 'recompose';
import { withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';

import App from './App';
import Loading from '../Loading';
import currentNetworkActions, { getAllNetworks } from '../../actions/settings/currentNetworkActions';
import withInitialCall from '../../hocs/withInitialCall';

const { LOADING } = progressValues;

export default compose(
  withRouter,
  withInitialCall(currentNetworkActions),
  withInitialCall(getAllNetworks),
  withProgressComponents(currentNetworkActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoadedStrategy
  })
)(App);
