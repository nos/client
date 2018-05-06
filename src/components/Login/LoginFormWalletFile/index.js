import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import LoginFormWalletFile from './LoginFormWalletFile';
import withLogin from '../../../hocs/withLogin';
import withAlert from '../../../hocs/withAlert';

export default compose(
  withAlert(),
  withState('encryptedWIF', 'setEncryptedWIF'),
  withState('accounts', 'setAccounts'),
  withState('passphrase', 'setPassphrase'),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormWalletFile);
