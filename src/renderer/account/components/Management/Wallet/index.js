import { compose, withState } from 'recompose';
import { withActions, withData, progressValues } from 'spunky';

import authActions, { changeActiveWalletActions } from 'auth/actions/authActions';
import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast, withSuccessToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import balanceWithPricesActions from 'account/actions/balanceWithPricesActions';
import claimableActions from 'shared/actions/claimableActions';

import Wallet from './Wallet';

const { LOADED, FAILED } = progressValues;

const mapAuthDataToProps = (account) => ({ account });

const mapBalanceWithPricesActionsToProps = ({ reset }) => ({ resetBalances: reset });
const mapClaimableActionsToProps = ({ reset }) => ({ resetClaimables: reset });
const mapChangeActiveWalletActionsToProps = (actions) => ({
  changeActiveWallet: (data) => actions.call(data)
});

export default compose(
  withConfirm(),
  withState('passphrase', 'setPassphrase', ''),
  withData(authActions, mapAuthDataToProps),
  withActions(changeActiveWalletActions, mapChangeActiveWalletActionsToProps),
  withActions(balanceWithPricesActions, mapBalanceWithPricesActionsToProps),
  withActions(claimableActions, mapClaimableActionsToProps),

  withSuccessToast(),
  withProgressChange(changeActiveWalletActions, LOADED, (state, props) => {
    // TODO this is triggered wallet-amount times without the if. Why?
    if (props.wallet.walletId === state.data.activeWalletId) {
      props.resetBalances();
      props.resetClaimables();
      props.showSuccessToast(`Primary wallet successfuly changed!`);
    }
  }),

  withErrorToast(),
  withProgressChange(changeActiveWalletActions, FAILED, (state, props) => {
    // TODO this is triggered wallet-amount times without the if. Why?
    if (props.wallet.walletId === state.data.activeWalletId) {
      props.showErrorToast(`Failed to set new primary wallet. ${state.error}`);
    }
  })
)(Wallet);
