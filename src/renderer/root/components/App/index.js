import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';

import updateNetworks from 'util/updateNetworks';

import Loading from 'shared/components/Loading';
import withInitialCall from 'shared/hocs/withInitialCall';
import withProgressChange from 'shared/hocs/withProgressChange';
import feeActions from 'settings/actions/feeActions';
import currencyActions from 'settings/actions/currencyActions';
import currentNetworkActions from 'settings/actions/currentNetworkActions';
import getAllNetworks from 'settings/actions/networksActions';
import themeActions from 'settings/actions/themeActions';

import App from './App';

const { LOADING, LOADED } = progressValues;

const mapNetworksToProps = (networks) => ({ networks });

export default compose(
  withRouter,
  // withInitialCall(authActions),
  withInitialCall(feeActions),
  withInitialCall(currencyActions),
  withInitialCall(currentNetworkActions),
  withInitialCall(getAllNetworks),
  withInitialCall(themeActions),

  // Used to update default networks in the settings section
  withData(getAllNetworks, mapNetworksToProps),
  withProgressChange(getAllNetworks, LOADED, (state, props) => updateNetworks(props.networks)),

  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([currencyActions, currentNetworkActions], { ... })
  ...[feeActions, currencyActions, currentNetworkActions, getAllNetworks, themeActions].map(
    (actions) => {
      return withProgressComponents(
        actions,
        {
          [LOADING]: Loading
        },
        {
          strategy: alreadyLoadedStrategy
        }
      );
    }
  )
)(App);
