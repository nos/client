import { compose } from 'recompose';
import { withActions } from 'spunky';

import Logout from './Logout';
import accountActions from '../../../shared/actions/accountActions';
import withLogout from '../../hocs/withLogout';

const mapActionsToProps = ({ reset }) => ({
  logout: reset
});

export default compose(
  withActions(accountActions, mapActionsToProps),
  withLogout((state, { history }) => history.push('/login'))
)(Logout);
