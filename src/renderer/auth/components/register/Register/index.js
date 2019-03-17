import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withData } from 'spunky';

import withUnmountReset from 'shared/hocs/withUnmountReset';
import withLogin from 'auth/hocs/withLogin';
import createProfileActions from 'auth/actions/createProfileActions';
import storeProfileActions from 'auth/actions/profileActions';

import Register from './Register';

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withUnmountReset(createProfileActions),
  withUnmountReset(storeProfileActions),
  withData(createProfileActions, mapAccountDataToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(Register);
