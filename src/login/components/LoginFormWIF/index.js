import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import LoginFormWIF from './LoginFormWIF';
import withLogin from '../../hocs/withLogin';

export default compose(
  withState('wif', 'setWIF', ''),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(LoginFormWIF);
