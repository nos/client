import { compose, withProps } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';

import accountActions from 'actions/accountActions';
import { emptyAll } from 'actions/requestsActions';

import Logout from './Logout';
import withLogout from '../../hocs/withLogout';

const mapActionsToProps = ({ reset }) => ({
  reset
});

const mapDispatchToProps = (dispatch) => ({
  emptyAllRequests: () => dispatch(emptyAll())
});

export default compose(
  connect(null, mapDispatchToProps),
  withActions(accountActions, mapActionsToProps),
  withLogout((state, { history }) => history.push('/login')),
  withProps(({ emptyAllRequests, reset }) => ({
    logout: () => {
      reset();
      emptyAllRequests();
    }
  }))
)(Logout);
