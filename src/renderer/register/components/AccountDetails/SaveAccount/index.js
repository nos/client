import { compose, withProps } from 'recompose';
import { withActions, alreadyLoadedStrategy, withProgress, progressValues } from 'spunky';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import withInitialCall from 'shared/hocs/withInitialCall';
import Loading from 'shared/components/Loading';
import { writePreviousAuthActions } from 'login/actions/previousAuthActions';
import authActions from 'login/actions/authActions';
import withAlert from 'shared/hocs/withAlert';
import withLogin from 'login/hocs/withLogin';

import storeProfileActions from '../../../actions/storeProfileActions';
import SaveAccount from './SaveAccount';

const { LOADING } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});


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
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),
  withActions(storeProfileActions, mapStoreProfileActionsToProps),
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING }))
)(SaveAccount);
