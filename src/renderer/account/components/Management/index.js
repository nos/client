import { compose, withState } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_COIN } from 'shared/values/coins';
import withProgressChange from 'shared/hocs/withProgressChange';
import withInitialCall from 'shared/hocs/withInitialCall';

import authActions from 'auth/actions/authActions';
import walletActions, { addWalletActions } from 'auth/actions/walletActions';

import Management from './Management';

const { FAILED } = progressValues;

const mapAuthDataToProps = (account) => ({ account });
const mapWalletDataToProps = (wallets) => ({ wallets });
const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

export default compose(
  withData(authActions, mapAuthDataToProps),
  withInitialCall(walletActions, ({ account }) => ({ accountLabel: account.accountLabel })),
  withData(walletActions, mapWalletDataToProps),

  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('coinType', 'setCoinType', ({ coinType }) => coinType || DEFAULT_COIN),
  withActions(addWalletActions, mapAddAccountActionsToProps),
  withProgressChange(addWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  })
)(Management);
