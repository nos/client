import { withData } from 'spunky';

import GetAddress from './GetAddress';
import authActions from '../../../../actions/authActions';

const mapAuthDataToProps = ({ address }) => ({ address });

export default withData(authActions, mapAuthDataToProps)(GetAddress);
