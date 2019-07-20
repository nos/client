import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withActions, withData, progressValues } from 'spunky';
import { random } from 'lodash';

import authActions from 'auth/actions/authActions';
import accountActions from 'auth/actions/accountActions';
import registerCompletionActions from 'register/actions/registerCompletionActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import withLogin from 'auth/hocs/withLogin';
import registerFormActions from 'register/actions/registerFormActions';
import { withErrorToast } from 'shared/hocs/withToast';

import VerifyAccount from './VerifyAccount';

const { LOADED, FAILED } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapAuthActionsToProps = (actions) => ({
  authenticate: (data) => actions.call(data)
});

const mapRegisterCompletionActionsToProps = (actions) => ({
  completeRegistration: (data) => actions.call(data),
  resetCompleteRegistration: () => actions.reset()
});

const mapRegisterFormActionsToProps = (actions) => ({
  resetRegisterFormData: () => actions.reset()
});

const mapAccountActionsToProps = (actions) => ({
  resetAccountsData: () => actions.reset()
});

const mapAccountDataToProps = (account) => ({ account });
const mapRegisterCompletionDataToProps = (accountComplete) => ({ accountComplete });

export default compose(
  withData(registerFormActions, mapAccountDataToProps),
  withData(registerCompletionActions, mapRegisterCompletionDataToProps),
  withActions(accountActions, mapAccountActionsToProps),
  withActions(authActions, mapAuthActionsToProps),
  withActions(registerFormActions, mapRegisterFormActionsToProps),
  withActions(registerCompletionActions, mapRegisterCompletionActionsToProps),
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  withState('passphrase', 'setPassphrase', ''),
  withState('secretWord', 'setSecretWord', ''),
  withState(
    'firstMnemonicWordIndex',
    'setFirstMnemonicWordIndex',
    ({ firstMnemonicWordIndex }) => firstMnemonicWordIndex || random(1, 12)
  ),
  withState(
    'secondMnemonicWordIndex',
    'setSecondMnemonicWordIndex',
    ({ secondMnemonicWordIndex }) => secondMnemonicWordIndex || random(13, 24)
  ),
  withState('firstMnemonicWord', 'setFirstMnemonicWord', ''),
  withState('secondMnemonicWord', 'setSecondMnemonicWord', ''),

  withProgressChange(registerCompletionActions, LOADED, (state, props) => {
    const { authenticate, accountComplete } = props;
    const { account, passphrase } = accountComplete;
    authenticate({ account, passphrase });
  }),

  withErrorToast(),
  withProgressChange(registerCompletionActions, FAILED, (state, props) => {
    props.showErrorToast(state.error);
  }),

  withRouter,
  withLogin((state, {
    history,
    auth,
    resetCompleteRegistration,
    resetRegisterFormData,
    resetAccountsData,
    setLastLogin
  }) => {
    setLastLogin({ label: auth.accountLabel });
    resetRegisterFormData();
    resetCompleteRegistration();
    resetAccountsData();
    history.push('/browser');
  })
)(VerifyAccount);
