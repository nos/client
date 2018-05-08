import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import withAlert from 'shared/hocs/withAlert';

import LoginFormWalletFile from './LoginFormWalletFile';
import withLogin from '../../hocs/withLogin';

export default compose(
  withAlert(),
  withState('wif', 'setWIF'),
  withState('accounts', 'setAccounts'),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormWalletFile);
