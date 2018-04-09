import { withData } from 'spunky';

import GetAddress from './GetAddress';
import authActions from '../../../actions/authActions';

const mapAuthDataToProps = ({ address }) => ({ address });

export default function makeGetAddress() {
  return withData(authActions, mapAuthDataToProps)(GetAddress);
}
