import BigNumber from 'bignumber.js';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { withData, withActions, withProgress, progressValues } from 'spunky';

import authActions from 'login/actions/authActions';
import feeActions from 'settings/actions/feeActions';
import sendActions from 'shared/actions/sendActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withConfirm from 'shared/hocs/withConfirm';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';
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
    fee: props.fee,
    asset,
    amount,
    receiver
  })
});

const mapFeeDataToProps = (fee) => ({ fee });
const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });

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

  withProgress(sendActions),
  withProps((props) => ({ loading: props.progress === LOADING })),

  withConfirm(),
  withSuccessToast(),
  withErrorToast(),

  withLoadingProp(sendActions, { strategy: pureStrategy }),
  withProgressChange(sendActions, LOADED, (state, props) => {
    props.showSuccessToast('Transaction added to blockchain');
    props.setAmount('0');
    props.setReceiver('');
  }),
  withProgressChange(sendActions, FAILED, (state, props) => {
    props.showErrorToast(`Transaction failed. ${state.error}`);
  })
)(Send);
