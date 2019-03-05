import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import { withErrorToast } from 'shared/hocs/withToast';
import withLogin from 'auth/hocs/withLogin';

import LoginFormWalletFile from './LoginFormWalletFile';

export default compose(
  withErrorToast(),
  withState('encryptedWIF', 'setEncryptedWIF'),
  withState('accounts', 'setAccounts'),
  withState('passphrase', 'setPassphrase'),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormWalletFile);
