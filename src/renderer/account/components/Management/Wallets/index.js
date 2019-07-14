import { compose, withState } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_CHAIN } from 'shared/values/chains';
import withProgressChange from 'shared/hocs/withProgressChange';

import authActions from 'auth/actions/authActions';

import Wallets from './Wallets';

const { FAILED } = progressValues;

const mapAuthDataToProps = (account) => ({ account });
const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

// TODO clean up
export default compose(
  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('chainType', 'setChainType', DEFAULT_CHAIN),
  withData(authActions, mapAuthDataToProps),
  // withActions(addAccountActions, mapAddAccountActionsToProps),
  // withProgressChange(addAccountActions, FAILED, (state, props) => {
  //   props.showErrorToast(state.error);
  // })
)(Wallets);
