import { compose, withState } from 'recompose';
import { withActions, progressValues } from 'spunky';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_COIN } from 'shared/values/coins';
import withProgressChange from 'shared/hocs/withProgressChange';
import { addWalletActions } from 'auth/actions/walletActions';

import Mnemonic from './Mnemonic';

const { FAILED, LOADED } = progressValues;

const config = {
  length: 2,
  separator: ' ',
  style: 'capital',
  dictionaries: [colors, animals]
};

const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

export default compose(
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('walletLabel', 'setWalletLabel', uniqueNamesGenerator(config)),
  withState('coinType', 'setCoinType', ({ coinType }) => coinType || DEFAULT_COIN),
  withActions(addWalletActions, mapAddAccountActionsToProps),
  withProgressChange(addWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),
  withProgressChange(addWalletActions, LOADED, (state, props) => {
    props.onConfirm();
  })
)(Mnemonic);
