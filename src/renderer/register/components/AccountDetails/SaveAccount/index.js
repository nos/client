import { compose, withProps } from 'recompose';
import { withActions, withProgress, progressValues } from 'spunky';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';

import authActions from 'login/actions/authActions';
import withAlert from 'shared/hocs/withAlert';

import storeProfileActions from '../../../actions/storeProfileActions';
import SaveAccount from './SaveAccount';

const { LOADING } = progressValues;

const mapStoreProfileActionsToProps = (actions) => ({
  storeProfile: ({ walletName, address, encryptedKey }) => {
    return actions.call({ walletName, address, encryptedKey });
  }
});

const mapAuthActionsToProps = (actions) => ({
  login: ({ wif, passphrase, encryptedWIF, publicKey }) => {
    return actions.call({ wif, passphrase, encryptedWIF, publicKey });
  }
});

export default compose(
  withAlert(),
  withActions(storeProfileActions, mapStoreProfileActionsToProps),
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING }))
)(SaveAccount);
