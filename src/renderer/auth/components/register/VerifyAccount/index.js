import { withRouter } from 'react-router-dom';
import { compose, withState, withProps } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';
import { random } from 'lodash';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { withErrorToast } from 'shared/hocs/withToast';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { verifyAndAuthenticateActions } from 'auth/actions/authActions';
import { appendAccountActions } from 'auth/actions/accountActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';
import previousAuthActions, { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import accountActions from 'auth/actions/accountActions';
import withLogin from 'auth/hocs/withLogin';

import VerifyAccount from './VerifyAccount';

const { FAILED } = progressValues;

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

export default compose(
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
  withState(
    'firstMnemonicWord',
    'setFirstMnemonicWord',
    ({ firstMnemonicWordIndex, account }) => account.mnemonic.split(' ')[firstMnemonicWordIndex - 1]
  ),
  withState(
    'secondMnemonicWord',
    'setSecondMnemonicWord',
    ({ secondMnemonicWordIndex, account }) => account.mnemonic.split(' ')[secondMnemonicWordIndex - 1]
  ),

  // redirect on login
  withRouter,
  withLogin((state, { history, account, setLastLogin, currentAccount, storeProfile }) => {
    history.push('/browser');
  })
)(VerifyAccount);
