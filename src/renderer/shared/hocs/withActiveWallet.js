import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

const mapAuthDataToProps = ({ wallet }) => ({
  ...wallet
});

export default function withActiveWallet() {
  return withData(authActions, mapAuthDataToProps);
}
