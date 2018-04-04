import { withActions } from 'spunky';

import Logout from './Logout';
import accountActions from '../../actions/accountActions';

const mapActionsToProps = ({ reset }) => ({
  logout: reset
});

export default withActions(accountActions, mapActionsToProps)(Logout);
