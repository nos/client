import { compose, withProps, withState } from 'recompose';
import { withData, withActions, withProgress, progressValues } from 'spunky';

import SendPanel from './SendPanel';
import authActions from '../../../actions/authActions';
import sendActions from '../../../actions/sendActions';
import withNetworkData from '../../../hocs/withNetworkData';
import withConfirm from '../../../hocs/withConfirm';
import withAlert from '../../../hocs/withAlert';
import withLoadingProp from '../../../hocs/withLoadingProp';
import withProgressChange from '../../../hocs/withProgressChange';
import pureStrategy from '../../../hocs/strategies/pureStrategy';
import { NEO } from '../../../values/assets';

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
