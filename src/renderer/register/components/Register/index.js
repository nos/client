import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withData } from 'spunky';

import withUnmountReset from 'shared/hocs/withUnmountReset';
import withLogin from 'login/hocs/withLogin';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';
import storeProfileActions from '../../actions/storeProfileActions';

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withUnmountReset(createAccountActions),
  withUnmountReset(storeProfileActions),
  withData(createAccountActions, mapAccountDataToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(Register);
