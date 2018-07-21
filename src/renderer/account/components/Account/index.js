import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues } from 'spunky';
import { filter, values, keys } from 'lodash';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import { ASSETS } from 'shared/values/assets';

import Account from './Account';
import pricesActions from '../../actions/pricesActions';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({
  balances: filter(values(balances), ({ scriptHash, balance }) => {
    return keys(ASSETS).includes(scriptHash) || balance !== '0';
  })
});

const mapPricesDataToProps = (prices) => ({ prices });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withInitialCall(balancesActions, ({ net, address }) => ({ net, address })),
  withInitialCall(pricesActions),

  // Wait for balance & price data to load
  withProgressComponents(balancesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withProgressComponents(pricesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),

  withData(balancesActions, mapBalancesDataToProps),
  withData(pricesActions, mapPricesDataToProps),
)(Account);
