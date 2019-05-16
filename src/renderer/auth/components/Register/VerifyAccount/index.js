import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { withActions, withData } from 'spunky';
import { random } from 'lodash';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { verifyAndAuthenticateActions } from 'auth/actions/authActions';
import { appendAccountActions } from 'auth/actions/accountActions';
import { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import withLogin from 'auth/hocs/withLogin';
import registerActions from 'auth/actions/registerActions';

import VerifyAccount from './VerifyAccount';

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapAppendAccountActionsToProps = (actions) => ({
  storeProfile: (data) => {
    return actions.call(data);
  }
});

const mapAuthActionsToProps = (actions) => ({
  verifyAndAuthenticate: (data) => {
    return actions.call(data);
  }
});

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withData(registerActions, mapAccountDataToProps),
  withActions(verifyAndAuthenticateActions, mapAuthActionsToProps),
  withActions(appendAccountActions, mapAppendAccountActionsToProps),
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),

  withLoadingProp(verifyAndAuthenticateActions, { strategy: pureStrategy }),

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
  withState('firstMnemonicWord', 'setFirstMnemonicWord', ({ firstMnemonicWordIndex, account }) => (!account.isLedger ? account.mnemonic.split(' ')[firstMnemonicWordIndex - 1] : '')),
  withState('secondMnemonicWord', 'setSecondMnemonicWord', ({ secondMnemonicWordIndex, account }) => (!account.isLedger ? account.mnemonic.split(' ')[secondMnemonicWordIndex - 1] : ''))

  // redirect on login TODO remove?
  // withRouter,
  // withLogin((state, { history }) => {
  //   history.push('/browser');
  // })
)(VerifyAccount);
