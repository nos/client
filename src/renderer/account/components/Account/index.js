import { compose } from 'recompose';
import { withData } from 'spunky';

import balancesActions from 'shared/actions/balancesActions';
import claimableActions from 'shared/actions/claimableActions';
import currencyActions from 'settings/actions/currencyActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import Account from './Account';
import pricesActions from '../../actions/pricesActions';

const mapAuthDataToProps = ({ address }) => ({ address });

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(currencyActions, mapCurrencyDataToProps),
  withNetworkData(),
  withInitialCall(claimableActions, ({ net, address }) => ({ net, address })),
  withInitialCall(balancesActions, ({ net, address }) => ({ net, address })),
  withInitialCall(pricesActions, ({ currency }) => ({ currency }))
)(Account);
