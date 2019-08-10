import { compose, withProps } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import withNewWalletModal from 'shared/hocs/withNewWalletModal';
import withActiveAccount from 'shared/hocs/withActiveAccount';

import authActions from 'auth/actions/authActions';
import walletActions from 'auth/actions/walletActions';

import Management from './Management';
import { ARK, NOS, NEO } from '../../../shared/values/assets';
import { DEFAULT_NET } from '../../../../common/values/networks';

const mapAuthDataToProps = (account) => ({ account });
const mapWalletDataToProps = (wallets) => ({ wallets });

export default compose(
  withNewWalletModal(),
  withData(authActions, mapAuthDataToProps),
  withInitialCall(walletActions, ({ account }) => ({ accountLabel: account.accountLabel })),
  withData(walletActions, mapWalletDataToProps),
  withActiveAccount(),
  withProps(({ net, coinType }) => {
    if (coinType === 111) {
      return { DEFAULT_TOKEN: ARK };
    }
    return { DEFAULT_TOKEN: net === DEFAULT_NET ? NOS : NEO };
  })
)(Management);
