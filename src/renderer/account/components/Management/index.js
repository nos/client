import { compose } from 'recompose';
import { withData, withCall } from 'spunky';

import walletActions from 'auth/actions/walletActions';
import authActions from 'auth/actions/authActions';

import Management from './Management';

const mapAuthDataToProps = (account) => ({ account });
const mapWalletDataToProps = (wallets) => ({ wallets });

export default compose(
  withCall(walletActions),
  withData(authActions, mapAuthDataToProps),
  withData(walletActions, mapWalletDataToProps),
)(Management);
