import { compose, withState } from 'recompose';
import { withCall, withData, withActions, progressValues } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_COIN } from 'shared/values/coins';
import withProgressChange from 'shared/hocs/withProgressChange';

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
  withCall(walletActions, ({ account }) => ({ accountLabel: account.accountLabel })),
  withData(walletActions, mapWalletDataToProps),

  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('chainType', 'setChainType', ({ chainType }) => chainType || DEFAULT_COIN),
  withActions(addWalletActions, mapAddAccountActionsToProps),
  withProgressChange(addWalletActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  })
)(Management);
