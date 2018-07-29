import { compose, withProps } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';

import accountActions from 'shared/actions/accountActions';
import { resetTabs } from 'browser/actions/browserActions';
import { emptyAll } from 'browser/actions/requestsActions';

import Logout from './Logout';
import withLogout from '../../hocs/withLogout';

const mapActionsToProps = ({ reset }) => ({
  resetAuth: reset
});

const mapDispatchToProps = (dispatch) => ({
  resetAllTabs: () => dispatch(resetTabs()),
  emptyAllRequests: () => dispatch(emptyAll())
});

export default compose(
  connect(null, mapDispatchToProps),
  withActions(accountActions, mapActionsToProps),
  withLogout((state, { history }) => history.push('/login')),
  withProps(({ emptyAllRequests, resetAllTabs, resetAuth }) => ({
    logout: () => {
      resetAuth();
      resetAllTabs();
      emptyAllRequests();
    }
  }))
)(Logout);
