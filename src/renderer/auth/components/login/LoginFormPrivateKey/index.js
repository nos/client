import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import withLogin from 'auth/hocs/withLogin';

import LoginFormPrivateKey from './LoginFormPrivateKey';

export default compose(
  withState('wif', 'setWIF', ''),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormPrivateKey);
