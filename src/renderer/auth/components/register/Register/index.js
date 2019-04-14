import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import withUnmountReset from 'shared/hocs/withUnmountReset';
import withLogin from 'auth/hocs/withLogin';
import createAccountActions from 'auth/actions/createAccountActions';

import Register from './Register';

const mapAccountDataToProps = (account) => ({ account });
const mapAccountActionsToProps = (actions) => ({ reset: actions.reset });

export default compose(
  withUnmountReset(createAccountActions),
  withData(createAccountActions, mapAccountDataToProps),
  withActions(createAccountActions, mapAccountActionsToProps),

  // redirect on login
  withRouter,
  withLogin((state, { history }) => history.push('/browser'))
)(Register);
