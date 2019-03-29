import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

const mapAuthDataToProps = ({ activeAccountId, instances }) => ({
  ...instances[activeAccountId], // TODO obsolete?
  address: instances[activeAccountId].address,
  publicKey: instances[activeAccountId].publicKey,
  privateKey: instances[activeAccountId].privateKey,
  WIF: instances[activeAccountId].WIF
});

export default function withActiveAccount() {
  return withData(authActions, mapAuthDataToProps);
}
