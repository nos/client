import { withActions } from 'spunky';

import Logout from './Logout';
import authActions from '../../actions/authActions';

const mapActionsToProps = ({ reset }) => ({
  logout: reset
});

export default withActions(authActions, mapActionsToProps)(Logout);
