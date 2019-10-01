import { compose } from 'recompose';
import { withData } from 'spunky';

import claimableActions from 'shared/actions/claimableActions';
import currencyActions from 'settings/actions/currencyActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withAuthData from 'shared/hocs/withAuthData';
import withNetworkData from 'shared/hocs/withNetworkData';
import { withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withActiveWallet from 'shared/hocs/withActiveWallet';

import Portfolio from './Portfolio';
import balanceWithPricesActions from '../../actions/balanceWithPricesActions';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withData(currencyActions, mapCurrencyDataToProps),
  withAuthData(),
  withNetworkData(),
  withActiveWallet(),
  withInitialCall(claimableActions, ({ net, address }) => ({ net, address })),
  withInitialCall(balanceWithPricesActions, ({ currency, net, address }) => ({
    currency,
    net,
    address
  })),

  withLoadingProp(claimableActions),
  withLoadingProp(balanceWithPricesActions),
  withErrorToast()
)(Portfolio);
