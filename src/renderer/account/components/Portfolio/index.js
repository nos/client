import { compose } from 'recompose';
import { withData } from 'spunky';

import claimableActions from 'shared/actions/claimableActions';
import currencyActions from 'settings/actions/currencyActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withAuthData from 'shared/hocs/withAuthData';
import withNetworkData from 'shared/hocs/withNetworkData';
import withActiveWallet from 'shared/hocs/withActiveWallet';
import withWallets from 'shared/hocs/withWallets';

import Portfolio from './Portfolio';
import balanceWithPricesActions from '../../actions/balanceWithPricesActions';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withData(currencyActions, mapCurrencyDataToProps),
  withWallets(),
  withAuthData(),
  withNetworkData(),
  withActiveWallet(),
  withInitialCall(claimableActions, ({ net, wallet: { address } }) => ({ net, address })),
  withInitialCall(balanceWithPricesActions, ({ currency, net, account }) => ({
    currency,
    net,
    account
  }))
)(Portfolio);
