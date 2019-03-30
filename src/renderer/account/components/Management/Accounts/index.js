import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

import Accounts from './Accounts';

const mapAuthDataToProps = (auth) => auth;

export default compose(withData(authActions, mapAuthDataToProps))(Accounts);
