import { withData } from 'spunky';

import GetAddress from './GetAddress';
import authActions from '../../../../login/actions/authActions';

const mapAuthDataToProps = ({ address }) => ({ address });

export default function makeGetAddress() {
  // Get the current account address
  return withData(authActions, mapAuthDataToProps)(GetAddress);
}
