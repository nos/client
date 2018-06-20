import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues } from 'spunky';
import { sortBy } from 'lodash';
import fetch from 'node-fetch';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import { ID as currentNetworkActionsID } from 'settings/actions/currentNetworkActions';
import { getStorage } from 'shared/lib/storage';
import { PREDEFINED_NETWORKS } from 'settings/values/networks';

import AccountPanel from './AccountPanel';

const MAINNET = PREDEFINED_NETWORKS[0];

const tokenListUrl = 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/tokenList.json';

const tokenListPromise = (async () => {
  const response = await fetch(tokenListUrl);
  const tokenList = Object.values(await response.json());
  return sortBy(tokenList, 'symbol').map((token) => {
    return { scriptHash: token.networks['1'].hash };
  });
})();

const tokensPromise = (async () => {
  const currentNetwork = await getStorage(currentNetworkActionsID);
  if (currentNetwork !== MAINNET) {
    return [];
  }

  return tokenListPromise;
})();

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withInitialCall(balancesActions, ({ net, address }) => ({
    net,
    address,
    tokens: tokensPromise
  })),

  // Wait for balances data to load
  withProgressComponents(balancesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(balancesActions, mapBalancesDataToProps)
)(AccountPanel);
