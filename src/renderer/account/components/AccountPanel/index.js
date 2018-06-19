import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues } from 'spunky';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import AccountPanel from './AccountPanel';

const fetch = require('isomorphic-fetch');

const tokenListUrl = 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/tokenList.json';

let tokens = [];
fetch(tokenListUrl).then((data) => data.json()).then((data) => {
  tokens = Object.values(data).sort((a, b) => {
    if (a.symbol > b.symbol) {
      return 1;
    } else if (b.symbol > a.symbol) {
      return -1;
    } else {
      return 0;
    }
  }).map((token) => {
    return { scriptHash: token.networks['1'].hash };
  });
});

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withInitialCall(balancesActions, ({ net, address }) => ({
    net,
    address,
    tokens
  })),

  // Wait for balances data to load
  withProgressComponents(balancesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(balancesActions, mapBalancesDataToProps)
)(AccountPanel);
