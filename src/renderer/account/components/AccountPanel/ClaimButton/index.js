import { compose } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import authActions from 'login/actions/authActions';
import claimActions from 'shared/actions/claimActions';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withNetworkData from 'shared/hocs/withNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import ClaimButton from './ClaimButton';

const { LOADED, FAILED } = progressValues;

const mapAuthDataToProps = (data) => (data);

const mapClaimActionsToProps = (actions, props) => ({
  onClick: () => actions.call({ net: props.net, address: props.address, wif: props.wif })
});

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withActions(claimActions, mapClaimActionsToProps),
  withLoadingProp(claimActions, { strategy: pureStrategy }),

  withSuccessToast(),
  withProgressChange(claimActions, LOADED, (state, props) => {
    props.showSuccessToast(`Claim submitted, available ${props.symbol} will update shortly`);
  }),

  withErrorToast(),
  withProgressChange(claimActions, FAILED, (state, props) => {
    props.showErrorToast(`Claim failed. ${state.error}`);
  })
)(ClaimButton);
