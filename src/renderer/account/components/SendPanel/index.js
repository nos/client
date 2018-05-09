import { compose, withProps, withState } from 'recompose';
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

const mapSendActionsToProps = (actions) => ({
  doTransfer: ({ net, asset, amount, receiver, address, wif }) => {
    return actions.call({ net, asset, amount, receiver, address, wif });
  }
});

const mapAuthDataToProps = ({ address, wif }) => ({ address, wif });

export default compose(
  withState('amount', 'setAmount', ''),
  withState('receiver', 'setReceiver', ''),
  withState('asset', 'setAsset', NEO),
  withState('step', 'setStep', '1'),

  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
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
