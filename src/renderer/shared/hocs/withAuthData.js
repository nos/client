import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

export default function withAuthData(propName = 'auth') {
  const mapAuthDataToProps = (auth) => ({
    [propName]: auth
  });
  return withData(authActions, mapAuthDataToProps);
}
