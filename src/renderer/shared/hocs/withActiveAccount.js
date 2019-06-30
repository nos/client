import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

const mapAuthDataToProps = ({ wallet }) => ({
  ...wallet
});

export default function withActiveAccount() {
  return withData(authActions, mapAuthDataToProps);
}
