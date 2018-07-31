import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import Receive from './Receive';

const mapAuthDataToProps = ({ address }) => ({ address });

export default withData(authActions, mapAuthDataToProps)(Receive);
