import { compose, withState } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import withConfirm from 'shared/hocs/withConfirm';
import { withErrorToast } from 'shared/hocs/withToast';
import { DEFAULT_CHAIN } from 'shared/values/chains';
import withProgressChange from 'shared/hocs/withProgressChange';

import authActions, { addAccountActions } from 'auth/actions/authActions';

import Accounts from './Accounts';

const { FAILED } = progressValues;

const mapAuthDataToProps = (account) => ({ account });
const mapAddAccountActionsToProps = (actions) => ({
  addAccount: (data) => actions.call(data)
});

export default compose(
  withConfirm(),
  withErrorToast(),
  withState('passphrase', 'setPassphrase', ''),
  withState('chainType', 'setChainType', DEFAULT_CHAIN),
  withData(authActions, mapAuthDataToProps),
  withActions(addAccountActions, mapAddAccountActionsToProps),
  withProgressChange(addAccountActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  })
)(Accounts);
