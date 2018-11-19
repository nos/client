import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues, alreadyLoadedStrategy } from 'spunky';
import { pickBy, keys } from 'lodash';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import claimableActions from 'shared/actions/claimableActions';
import currencyActions from 'settings/actions/currencyActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import { ASSETS, NOS } from 'shared/values/assets';

import Account from './Account';
import pricesActions from '../../actions/pricesActions';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapCurrencyDataToProps = (currency) => ({ currency });

const mapBalancesDataToProps = (balances) => ({
  balances: pickBy(balances, ({ scriptHash, balance }) => {
    return keys(ASSETS).includes(scriptHash) || scriptHash === NOS || balance !== '0';
  })
});

const mapClaimableDataToProps = (claimable) => ({ claimable });
const mapPricesDataToProps = (prices) => ({ prices });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(currencyActions, mapCurrencyDataToProps),
  withNetworkData(),
  withInitialCall(claimableActions, ({ net, address }) => ({ net, address })),
  withInitialCall(balancesActions, ({ net, address }) => ({ net, address })),
  withInitialCall(pricesActions, ({ currency }) => ({ currency })),

  // TODO: update spunky to permit combining actions without creating a batch, i.e.:
  //       withProgressComponents([balancesActions, pricesActions], { ... })
  ...([claimableActions, balancesActions, pricesActions].map((actions) => {
    return withProgressComponents(actions, {
      [LOADING]: Loading,
      [FAILED]: Failed
    }, {
      strategy: alreadyLoadedStrategy
    });
  })),

  withData(claimableActions, mapClaimableDataToProps),
  withData(balancesActions, mapBalancesDataToProps),
  withData(pricesActions, mapPricesDataToProps),
)(Account);
