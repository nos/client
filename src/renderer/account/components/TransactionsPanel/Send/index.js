import BigNumber from 'bignumber.js';
import { compose, withState, withHandlers } from 'recompose';
import { withData, withActions, progressValues } from 'spunky';

import authActions from 'login/actions/authActions';
import feeActions from 'settings/actions/feeActions';
import sendActions from 'shared/actions/sendActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withConfirm from 'shared/hocs/withConfirm';
import { withInfoToast, withSuccessToast, withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { NEO } from 'shared/values/assets';

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
const mapAuthDataToProps = (data) => (data);

export default compose(
  withState('amount', 'setAmount', ''),
  withState('receiver', 'setReceiver', ''),
  withState('asset', 'setAsset', NEO),
  withState('step', 'setStep', '0'),
  withHandlers({
    setAsset: ({ setAsset, setStep, balances }) => (asset) => {
      const { decimals } = balances[asset];
      setAsset(asset);
      setStep(new BigNumber(10).pow(-decimals).toFixed(decimals));
    }
  }),

  withNetworkData(),
  withData(feeActions, mapFeeDataToProps),
  withData(authActions, mapAuthDataToProps),
  withActions(sendActions, mapSendActionsToProps),

  withConfirm(),
  withInfoToast(),
  withSuccessToast(),
  withErrorToast(),

  withLoadingProp(sendActions, { strategy: pureStrategy }),
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
