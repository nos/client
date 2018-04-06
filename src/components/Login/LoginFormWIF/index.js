import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';

import LoginFormWIF from './LoginFormWIF';
import withLogin from '../../../hocs/withLogin';

export default compose(
  withState('wif', 'setWIF', ''),

  // redirect on login
  withRouter,
  withLogin((data, { history }) => history.push('/'))
)(LoginFormWIF);
