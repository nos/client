import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';
import walletActions from 'auth/actions/walletActions';
import withInitialCall from 'shared/hocs/withInitialCall';

export default function withWallets(propName = 'wallets') {
  const mapWalletDataToProps = (wallets) => ({
    [propName]: wallets
  });

  const mapAuthDataToProps = (account) => ({ account });

  return compose(
    withData(authActions, mapAuthDataToProps),
    withInitialCall(walletActions, ({ account }) => ({ accountLabel: account.accountLabel })),
    withData(walletActions, mapWalletDataToProps)
  );
}
