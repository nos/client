import { compose } from 'recompose';
import { withData, withActions, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { withRouter } from 'react-router-dom';
import { map, difference } from 'lodash';

import updateNetworks from 'util/updateNetworks';

import Loading from 'shared/components/Loading';
import withInitialCall from 'shared/hocs/withInitialCall';
import withProgressChange from 'shared/hocs/withProgressChange';
import feeActions from 'settings/actions/feeActions';
import currencyActions from 'settings/actions/currencyActions';
import currentNetworkActions, { setCurrentNetwork } from 'settings/actions/currentNetworkActions';
import getAllNetworks from 'settings/actions/networksActions';

import App from './App';

const { LOADING, LOADED } = progressValues;

const mapNetworksToProps = (networks) => ({ networks });

const mapCurrentNetworkActionsToProps = (actions) => ({
  setCurrentNetwork: actions.call
});

export default compose(
  withRouter,
  withInitialCall(feeActions),
  withInitialCall(currencyActions),
  withInitialCall(currentNetworkActions),
  withInitialCall(getAllNetworks),
  withData(getAllNetworks, mapNetworksToProps),
  withProgressChange(getAllNetworks, LOADED, (state, props) => updateNetworks(props.networks)),

  // Change to new network whenever a new one is added
  // TODO: This logic should really go into the `NetworkSettings` container, but it's not working
  //       there.  Both the prevProps and nextProps `progress` are evaluating to "LOADED",
  //       effectively making it look like the progress did not transition from "LOADING".
  withActions(setCurrentNetwork, mapCurrentNetworkActionsToProps),
  withProgressChange(getAllNetworks, LOADED, (state, props, prevProps) => {
    const originalNetworkNames = map(prevProps.networks, 'name');
    const updatedNetworkNames = map(props.networks, 'name');
    const newNetworks = difference(updatedNetworkNames, originalNetworkNames);

    if (newNetworks.length > 0) {
      props.setCurrentNetwork(newNetworks[0]);
    }
  }),

  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([currencyActions, currentNetworkActions], { ... })
  ...([feeActions, currencyActions, currentNetworkActions, getAllNetworks].map((actions) => {
    return withProgressComponents(actions, {
      [LOADING]: Loading
    }, {
      strategy: alreadyLoadedStrategy
    });
  }))
)(App);
