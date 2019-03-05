import { compose } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';
import { pick } from 'lodash';

import authActions from 'auth/actions/authActions';
import claimActions from 'shared/actions/claimActions';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withNetworkData from 'shared/hocs/withNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { withInfoToast, withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import ClaimButton from './ClaimButton';

const { LOADING, LOADED, FAILED } = progressValues;

const mapAuthDataToProps = (data) => (data);

const mapClaimActionsToProps = (actions, props) => ({
  onClick: () => actions.call(pick(props, 'net', 'address', 'wif', 'publicKey', 'signingFunction'))
});

export default compose(
  withNetworkData(),
  withData(authActions, mapAuthDataToProps),
  withActions(claimActions, mapClaimActionsToProps),
  withLoadingProp(claimActions, { strategy: pureStrategy }),

  withInfoToast(),
  withProgressChange(claimActions, LOADING, (state, props) => {
    if (props.signingFunction) {
      props.showInfoToast('Please sign the transaction(s) on your Ledger.');
    }
  }, {
    strategy: pureStrategy
  }),

  withSuccessToast(),
  withProgressChange(claimActions, LOADED, (state, props) => {
    props.showSuccessToast(`Claim submitted, available ${props.symbol} will update shortly`);
  }),

  withErrorToast(),
  withProgressChange(claimActions, FAILED, (state, props) => {
    props.showErrorToast(`Claim failed. ${state.error}`);
  })
)(ClaimButton);
