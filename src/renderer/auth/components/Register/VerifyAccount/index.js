import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withActions, withData, progressValues } from 'spunky';
import { random } from 'lodash';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import authActions from 'auth/actions/authActions';
import registerCompletionActions from 'auth/actions/registerCompletionActions';
import { appendAccountActions } from 'auth/actions/accountActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import withLogin from 'auth/hocs/withLogin';
import registerActions from 'auth/actions/registerActions';

import VerifyAccount from './VerifyAccount';

const { LOADED } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapAppendAccountActionsToProps = (actions) => ({
  storeProfile: (data) => actions.call(data)
});

const mapAuthActionsToProps = (actions) => ({
  authenticate: (data) => actions.call(data)
});

const mapRegisterCompletionActionsToProps = (actions) => ({
  completeRegistration: (data) => actions.call(data)
});

const mapAccountDataToProps = (account) => ({ account });
const mapRegisterCompletionDataToProps = (accountComplete) => ({ accountComplete });

export default compose(
  withData(registerActions, mapAccountDataToProps),
  withData(registerCompletionActions, mapRegisterCompletionDataToProps),
  withActions(authActions, mapAuthActionsToProps),
  withActions(registerCompletionActions, mapRegisterCompletionActionsToProps),
  withActions(appendAccountActions, mapAppendAccountActionsToProps),
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  withLoadingProp(registerCompletionActions, { strategy: pureStrategy }),

  withState('passphrase', 'setPassphrase', 'q'),
  withState('secretWord', 'setSecretWord', 'MySercetWord'),
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
  withState('firstMnemonicWord', 'setFirstMnemonicWord', ({ firstMnemonicWordIndex, account }) => (!account.isHardware ? account.mnemonic.split(' ')[firstMnemonicWordIndex - 1] : '')),
  withState('secondMnemonicWord', 'setSecondMnemonicWord', ({ secondMnemonicWordIndex, account }) => (!account.isHardware ? account.mnemonic.split(' ')[secondMnemonicWordIndex - 1] : '')),

  withProgressChange(registerCompletionActions, LOADED, (state, props) => {
    const { authenticate, accountComplete: { account, passphrase } } = props;
    authenticate({ account, passphrase });
    // props.nextStep();
  }),

  // redirect on login TODO remove? Higher level?
  withRouter,
  withLogin((state, { history }) => {
    history.push('/browser');
  })
)(VerifyAccount);
