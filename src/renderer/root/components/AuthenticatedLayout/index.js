import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withActions, withData, progressValues } from 'spunky';
import { isEqual } from 'lodash';

import authActions from 'auth/actions/authActions';
import blockActions from 'shared/actions/blockActions';
import withAuthState from 'auth/hocs/withAuthState';
import withAuthData from 'shared/hocs/withAuthData';
import withNetworkData from 'shared/hocs/withNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import notifyWebviews from 'shared/util/notifyWebviews';
import balanceWithPricesActions from 'account/actions/balanceWithPricesActions';
import currencyActions from 'settings/actions/currencyActions';

import AuthenticatedLayout from './AuthenticatedLayout';

const { LOADED } = progressValues;

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId };
};

const mapAuthDataToProps = (props) => ({
  address: (props && props.auth && props.auth.wallet && props.auth.wallet.address) || undefined
});

const mapCurrencyDataToProps = (currency) => ({ currency });

const mapBlockActionsToProps = (actions, props) => ({
  getLastBlock: () => actions.call({ net: props.currentNetwork })
});

const mapbalanceWithPricesActionsToProps = (actions) => ({
  balancesWithPrices: (data) => actions.call(data)
});

const mapBlockDataToProps = (block) => ({ block });

export default compose(
  connect(mapStateToProps),
  withAuthState(),
  withData(currencyActions, mapCurrencyDataToProps),
  withAuthData(),
  withNetworkData('currentNetwork'),
  withActions(blockActions, mapBlockActionsToProps),
  withActions(balanceWithPricesActions, mapbalanceWithPricesActionsToProps),

  // Whenever a new block is received, notify all dApps & update account balances.
  withData(authActions, mapAuthDataToProps),
  withData(blockActions, mapBlockDataToProps),
  withProgressChange(blockActions, LOADED, (state, props, prevProps) => {
    if (!isEqual(props.block, prevProps.block)) {
      notifyWebviews('event', 'block', props.block);
      if (props.authenticated) {
        props.balancesWithPrices({
          currency: props.currency,
          net: props.currentNetwork,
          address: props.auth.wallet.address
        });
      }
    }
  })
)(AuthenticatedLayout);
