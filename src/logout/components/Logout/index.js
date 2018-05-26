import { compose } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';
import accountActions from 'shared/actions/accountActions';
import Logout from './Logout';
import withLogout from '../../hocs/withLogout';

import { emptyAll } from '../../../browser/actions/requestsActions';

const mapActionsToProps = ({ reset }, { emptyAllRequests }) => ({
  logout: () => {
    reset();
    emptyAllRequests();
  }
});

const mapDispatchToProps = (dispatch) => ({
  emptyAllRequests: () => dispatch(emptyAll())
});

export default compose(
  connect(null, mapDispatchToProps),
  withActions(accountActions, mapActionsToProps),
  withLogout((state, { history }) => history.push('/login'))
)(Logout);
