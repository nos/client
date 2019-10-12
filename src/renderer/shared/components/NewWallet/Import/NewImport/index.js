import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';

import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_COIN } from 'shared/values/coins';
import withProgressChange from 'shared/hocs/withProgressChange';
import { importWalletActions } from 'auth/actions/walletActions';

import NewImport from './NewImport';

const { FAILED, LOADED } = progressValues;

const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

export default compose(
  withErrorToast(),
  withState('newImport', 'setNewImport', true),
  withState('passphrase', 'setPassphrase', ''),
  withState('privateKey', 'setPrivateKey', ''),
  withState('coinType', 'setCoinType', ({ coinType }) => coinType || DEFAULT_COIN),
  withActions(importWalletActions, mapAddAccountActionsToProps),
  withProgressChange(importWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(importWalletActions, LOADED, (state, props) => {
    props.onConfirm();
  })
)(NewImport);
