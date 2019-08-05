import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

import GetAddress from './GetAddress';

const mapAuthDataToProps = ({ wallet }) => ({ address: wallet.address });

export default function makeGetAddress() {
  // Get the current account address
  return withData(authActions, mapAuthDataToProps)(GetAddress);
}
