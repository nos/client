import { compose, withState, withProps } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import { DEFAULT_NET } from 'common/values/networks';

import authActions from 'login/actions/authActions';
import feeActions from 'settings/actions/feeActions';
import sendActions from 'shared/actions/sendActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withConfirm from 'shared/hocs/withConfirm';
import { withInfoToast, withSuccessToast, withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { NOS, NEO } from 'shared/values/assets';

import Send from './Send';

const { LOADING, LOADED, FAILED } = progressValues;

const mapSendActionsToProps = (actions, props) => ({
  onSend: ({ asset, amount, receiver }) => actions.call({
    net: props.net,
    address: props.address,
    wif: props.wif,
    publicKey: props.publicKey,
    signingFunction: props.signingFunction,
    fee: props.fee,
    asset,
    amount,
    receiver
  })
});

const mapFeeDataToProps = (fee) => ({ fee });
const mapAuthDataToProps = (data) => data;

export default compose(
  withNetworkData(),
  withProps(({ net }) => ({
    DEFAULT_TOKEN: net === DEFAULT_NET ? NOS : NEO
  })),

  withState('amount', 'setAmount', ''),
  withState('receiver', 'setReceiver', ''),
  withState('asset', 'setAsset', ({ DEFAULT_TOKEN }) => DEFAULT_TOKEN),

  withNetworkData(),
  withData(feeActions, mapFeeDataToProps),
  withData(authActions, mapAuthDataToProps),
  withActions(sendActions, mapSendActionsToProps),

  withConfirm(),
  withInfoToast(),
  withSuccessToast(),
  withErrorToast(),

  withLoadingProp(sendActions, { propName: 'sending', strategy: pureStrategy }),
  withProgressChange(sendActions, LOADING, (state, props) => {
    if (props.signingFunction) {
      props.showInfoToast('Please sign the transaction on your Ledger');
    }
  }, {
    strategy: pureStrategy
  }),
  withProgressChange(sendActions, LOADED, (state, props) => {
    props.showSuccessToast('Transaction added to blockchain, account balances will update shortly');
    props.setAmount('0');
    props.setReceiver('');
  }, {
    strategy: pureStrategy
  }),
  withProgressChange(sendActions, FAILED, (state, props) => {
    props.showErrorToast(`Transaction failed. ${state.error}`);
  }, {
    strategy: pureStrategy
  })
)(Send);
