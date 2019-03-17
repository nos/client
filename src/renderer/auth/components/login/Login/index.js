import { compose, withProps } from 'recompose';
import { withActions, withProgress, progressValues } from 'spunky';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';

import authActions from 'auth/actions/authActions';
import withAuthError from 'auth/hocs/withAuthError';
import withAuthState from 'auth/hocs/withAuthState';

import LoginModal from './Login';

const { LOADING } = progressValues;

const mapAuthActionsToProps = (actions) => ({
  login: (data) => {
    return actions.call(data);
  }
});

export default compose(
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING })),
  withAuthState(),
  withAuthError
)(LoginModal);
