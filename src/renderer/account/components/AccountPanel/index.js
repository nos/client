import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import AccountPanel from './AccountPanel';

const mapAuthDataToProps = ({ address }) => ({ address });

export default withData(authActions, mapAuthDataToProps)(AccountPanel);
