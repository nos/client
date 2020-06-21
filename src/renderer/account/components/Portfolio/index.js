import { compose } from 'recompose';
import { withData, withActions, withError } from 'spunky';

import claimableActions from 'shared/actions/claimableActions';
import blockActions from 'shared/actions/blockActions';
import currencyActions from 'settings/actions/currencyActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withAuthData from 'shared/hocs/withAuthData';
import withNetworkData from 'shared/hocs/withNetworkData';
import { withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withActiveWallet from 'shared/hocs/withActiveWallet';

import Portfolio from './Portfolio';
import balanceWithPricesActions from '../../actions/balanceWithPricesActions';

const mapBlockDataToProps = (block) => ({ block });
const mapBlockErrorToProps = (blockError) => ({ blockError });

const mapCurrencyDataToProps = (currency) => ({ currency });
const mapbalanceWithPricesActionsToProps = (actions) => ({
  balancesWithPrices: (data) => actions.call(data)
});

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
  withActions(balanceWithPricesActions, mapbalanceWithPricesActionsToProps),
  withData(blockActions, mapBlockDataToProps),
  withError(blockActions, mapBlockErrorToProps),

  withLoadingProp(claimableActions),
  withLoadingProp(balanceWithPricesActions),
  withErrorToast()
)(Portfolio);
