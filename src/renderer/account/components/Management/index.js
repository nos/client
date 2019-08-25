import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNewWalletModal from 'shared/hocs/withNewWalletModal';

import authActions from 'auth/actions/authActions';
import walletActions from 'auth/actions/walletActions';

import Management from './Management';

const mapAuthDataToProps = (account) => ({ account });
const mapWalletDataToProps = (wallets) => ({ wallets });

export default compose(
  withNewWalletModal(),
  withData(authActions, mapAuthDataToProps),
  withInitialCall(walletActions, ({ account }) => ({ accountLabel: account.accountLabel })),
  withData(walletActions, mapWalletDataToProps)
)(Management);
