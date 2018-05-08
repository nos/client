import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import GetAddress from './GetAddress';

const mapAuthDataToProps = ({ address }) => ({ address });

export default function makeGetAddress() {
  // Get the current account address
  return withData(authActions, mapAuthDataToProps)(GetAddress);
}
