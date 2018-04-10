import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';

import authActions from '../../../actions/authActions';
import withPrompt from '../../../hocs/dapps/withPrompt';
import withNullLoader from '../../../hocs/dapps/withNullLoader';
import withRejectMessage from '../../../hocs/dapps/withRejectMessage';
import claimActions from '../../../actions/claimActions';
import ClaimGas from './ClaimGas';

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });
const mapSendDataToProps = (txid) => ({ txid });

export default compose(
  // Map the props
  withProps(() => ({
    net: 'TestNet'
  })),

  // Prompt user
  withPrompt(() => ('Would you like to claim GAS?')),

  // Getting account data
  withData(authActions, mapAuthDataToProps),

  // Do invoke if user accepts
  withCall(claimActions, ({ net, address, wif }) => ({
    net,
    address,
    wif
  })),
  withNullLoader(claimActions),
  withRejectMessage(claimActions, () => ('Could not claim GAS.')),
  withData(claimActions, mapSendDataToProps)
)(ClaimGas);
