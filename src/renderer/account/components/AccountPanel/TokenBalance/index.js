import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import authActions from 'login/actions/authActions';
import claimActions from 'shared/actions/claimableActions';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withNetworkData from 'shared/hocs/withNetworkData';

import TokenBalance from './TokenBalance';

const mapAuthDataToProps = ({ address }) => ({ address });

const mapClaimActionsToProps = (actions, props) => ({
  getBalances: () => actions.call({ net: props.net, address: props.address })
});

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withActions(claimActions, mapClaimActionsToProps),
  withLoadingProp(claimActions, { propName: 'claiming' })
)(TokenBalance);
