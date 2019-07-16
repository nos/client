// import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
// import { withData, withActions } from 'spunky';

// import withUnmountReset from 'shared/hocs/withUnmountReset';
import withLogin from 'auth/hocs/withLogin';
// import createAccountActions from 'auth/actions/createAccountActions';

import Register from './Register';

export default compose(
  withState('step', 'setStep', 1)
  // TODO reset unmount for registerActions and registerCompletionActions
  // withUnmountReset(createAccountActions),
  // withData(createAccountActions, mapAccountDataToProps),
  // withActions(createAccountActions, mapAccountActionsToProps),

  // redirect on login
  // withRouter,
  // withLogin((state, { history }) => history.push('/browser'))
)(Register);
