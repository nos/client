import { compose, withState } from 'recompose';
import { progressValues, withActions } from 'spunky';

import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import { importWalletActions } from 'auth/actions/walletActions';

import ExistingImport from './ExistingImport';

const { FAILED, LOADED } = progressValues;

const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

export default compose(
  withActions(importWalletActions, mapAddAccountActionsToProps),

  withState('currentAccount', 'setCurrentAccount', ({ accounts }) => {
    return accounts[0] && accounts[0].encryptedKey;
  }),
  withState('legacyPassphrase', 'setLegacyPassphrase', ''),
  withState('passphrase', 'setPassphrase', ''),

  withErrorToast(),
  withProgressChange(importWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(importWalletActions, LOADED, (state, props) => {
    props.onConfirm();
  })
)(ExistingImport);
