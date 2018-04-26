import { compose, withState } from 'recompose';
import { withData, withActions } from 'spunky';

import AccountTxPanel from './AccountTxPanel';
import authActions from '../../../actions/authActions';
import withNetworkData from '../../../hocs/withNetworkData';
import sendActions from '../../../actions/sendActions';

const mapSendActionsToProps = (actions) => ({
  doTransfer: ({ net, asset, amount, receiver, address, wif }) => {
    return actions.call({ net, asset, amount, receiver, address, wif });
  }
});

const mapAuthDataToProps = ({ address }) => ({ address });

// const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(

  withState('amount', 'setAmount', ''),
  withState('recipient', 'setRecipient', ''),

  withData(authActions, mapAuthDataToProps),
  withNetworkData(),
  withActions(sendActions, mapSendActionsToProps),

  // withConfirm(),

  // Wait for balances data to load
  // withProgressComponents(sendActions, {
  //   [LOADING]: Loading,
  //   [FAILED]: Failed
  // }),
//   withData(balancesActions, mapBalancesDataToProps)
)(AccountTxPanel);
