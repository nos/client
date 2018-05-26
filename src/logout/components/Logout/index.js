import { compose, withProps } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';
import accountActions from 'shared/actions/accountActions';
import Logout from './Logout';
import withLogout from '../../hocs/withLogout';

import { emptyAll } from '../../../browser/actions/requestsActions';

const mapActionsToProps = ({ reset }) => ({
  reset
});

export default compose(
  withActions(accountActions, mapActionsToProps),
  connect(null, (dispatch) => ({
    emptyAllRequests: () => dispatch(emptyAll())
  })),
  withLogout((state, { history }) => history.push('/login')),
  withProps(({ emptyAllRequests, reset }) => ({
    logout: () => {
      reset();
      emptyAllRequests();
    }
  }))
)(Logout);
