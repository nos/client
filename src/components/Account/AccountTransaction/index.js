import { compose, withProps, withState } from 'recompose';
import { withData, withActions, withProgress, progressValues } from 'spunky';

import AccountTxPanel from './AccountTxPanel';
import authActions from '../../../actions/authActions';
import withNetworkData from '../../../hocs/withNetworkData';
import sendActions from '../../../actions/sendActions';
import { NEO } from '../../../values/assets';
import pureStrategy from '../../../hocs/strategies/pureStrategy';

const { LOADING } = progressValues;

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
  withState('show', 'toggleShow', false),

  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withActions(sendActions, mapSendActionsToProps),

  withProgress(sendActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING })),
)(AccountTxPanel);
