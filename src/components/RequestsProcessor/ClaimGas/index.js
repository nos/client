import { withCall, withData } from 'spunky';
import { compose } from 'recompose';

import ClaimGas from './ClaimGas';
import { getCurrentNetwork } from '../../../actions/settings/currentNetworkActions';
import authActions from '../../../actions/authActions';
import withClean from '../../../hocs/dapps/withClean';
import withPrompt from '../../../hocs/dapps/withPrompt';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapSendDataToProps = (txid) => ({ txid });
const mapSettingsDataToProps = ({ currentNetwork }) => ({ net: currentNetwork });

export default function makeClaimComponent(claimActions) {
  return compose(
    // Clean redux store when done
    withClean(claimActions),

    // Get the current network
    withData(getCurrentNetwork, mapSettingsDataToProps),

    // Prompt user
    withPrompt('Would you like to claim GAS?'),

    // Getting account data
    withData(authActions, mapAuthDataToProps),

    // Do invoke if user accepts
    withCall(claimActions, ({ net, address, wif }) => ({
      net,
      address,
      wif
    })),
    withNullLoader(claimActions),
    withRejectMessage(claimActions, 'Could not claim GAS.'),
    withData(claimActions, mapSendDataToProps)
  )(ClaimGas);
}
