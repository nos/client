import BigNumber from 'bignumber.js';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { withData, withActions, withProgress, progressValues } from 'spunky';

import authActions from 'login/actions/authActions';
import sendActions from 'shared/actions/sendActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withConfirm from 'shared/hocs/withConfirm';
import withAlert from 'shared/hocs/withAlert';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { NEO } from 'shared/values/assets';

import SendPanel from './SendPanel';

const { LOADING, LOADED, FAILED } = progressValues;

const mapSendActionsToProps = (actions, props) => ({
  onSend: ({ asset, amount, receiver }) => actions.call({
    net: props.net,
    address: props.address,
    wif: props.wif,
    asset,
    amount,
    receiver
  })
});

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
  withData(authActions, mapAuthDataToProps),
  withActions(sendActions, mapSendActionsToProps),

  withProgress(sendActions),
  withProps((props) => ({ loading: props.progress === LOADING })),

  withConfirm(),
  withAlert(),

  withLoadingProp(sendActions, { strategy: pureStrategy }),
  withProgressChange(sendActions, LOADED, (state, props) => {
    props.alert('Transaction complete');
    props.setAmount('0');
    props.setReceiver('');
  }),
  withProgressChange(sendActions, FAILED, (state, props) => {
    props.alert(`Error: ${state.error}`);
  })
)(SendPanel);
