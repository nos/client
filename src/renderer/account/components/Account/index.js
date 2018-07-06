import { compose } from 'recompose';
import { withData, withProgressComponents, progressValues } from 'spunky';

import Loading from 'shared/components/Loading';
import Failed from 'shared/components/Failed';
import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';

import Account from './Account';

const { LOADING, FAILED } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withInitialCall(balancesActions, ({ net, address }) => ({ net, address })),

  // Wait for balances data to load
  withProgressComponents(balancesActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(Account);
