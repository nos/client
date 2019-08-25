import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

export default function withActiveWallet(propName = 'wallet') {
  const mapAuthDataToProps = ({ wallet }) => ({
    [propName]: wallet
  });

  return withData(authActions, mapAuthDataToProps);
}
