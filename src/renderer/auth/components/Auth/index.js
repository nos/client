import { withState, compose, withProps } from 'recompose';
import { withActions, withProgress, progressValues, withData } from 'spunky';
import { isEmpty } from 'lodash';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNullLoader from 'browser/hocs/withNullLoader';
import accountActions from 'auth/actions/accountActions';

import authActions from 'auth/actions/authActions';
import withAuthError from 'auth/hocs/withAuthError';
import withAuthState from 'auth/hocs/withAuthState';

import Auth, { LOGIN, REGISTER } from './Auth';

const { LOADING } = progressValues;

const mapAuthActionsToProps = (actions) => ({
  login: (data) => actions.call(data)
});

const mapAccountActionsToProps = (accounts) => ({
  accounts
});

export default compose(
  // Data needed - if accounts don't exist, redirect to Register component
  withInitialCall(accountActions),
  withNullLoader(accountActions),
  withData(accountActions, mapAccountActionsToProps),
  withState('component', 'setComponent', ({ accounts }) => (isEmpty(accounts) ? REGISTER : LOGIN)),

  // Map login action as it's used by both components + add loading state
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING })),
  withAuthState(),
  withAuthError
)(Auth);
