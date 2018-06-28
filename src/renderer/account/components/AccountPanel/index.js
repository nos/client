import { compose, withProps } from 'recompose';
import { withData, withProgressComponents, progressValues } from 'spunky';
import { pickBy } from 'lodash';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import AccountPanel from './AccountPanel';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withInitialCall(balancesActions, ({ net, address }) => ({ net, address })),

  // Wait for balances data to load
  withProgressComponents(balancesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(balancesActions, mapBalancesDataToProps),
  withProps(({ balances }) => ({
    balances: pickBy(balances, ({ balance }) => balance !== '0')
  }))
)(AccountPanel);
