import { compose, withState, withProps } from 'recompose';

import { withData, withActions, progressValues } from 'spunky';

import authActions from 'auth/actions/authActions';
import walletActions from 'auth/actions/walletActions';

import withActiveWallet from 'shared/hocs/withActiveWallet';

import withAuthData from 'shared/hocs/withAuthData';
import { DEFAULT_NET } from 'values/networks';

import withInitialCall from 'shared/hocs/withInitialCall';
import feeActions from 'settings/actions/feeActions';
import sendActions from 'shared/actions/sendActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import withConfirm from 'shared/hocs/withConfirm';
import { withInfoToast, withSuccessToast, withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';
import withProgressChange from 'shared/hocs/withProgressChange';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { NOS, NEO, ARK } from 'shared/values/assets';

import Send from './Send';

const { LOADING, LOADED, FAILED } = progressValues;

const mapSendActionsToProps = (actions, { net, account, fee, auth: { wallet } }) => ({
  onSend: ({ asset, amount, receiver }) =>
    actions.call({
      net,
      coinType: wallet.coinType,
      address: wallet.address,
      wif: wallet.wif,
      publicKey: wallet.publicKey,
      signingFunction: wallet.signingFunction,
      account,
      fee,
      asset,
      amount,
      receiver
    })
});

const mapFeeDataToProps = (fee) => ({ fee });

export default compose(
  withNetworkData(),
  withActiveWallet(),
  withProps(({ net, wallet }) => {
    const { coinType } = wallet;

    if (coinType === 111) {
      return { DEFAULT_TOKEN: ARK };
    }
    return { DEFAULT_TOKEN: net === DEFAULT_NET ? NOS : NEO };
  }),

  withState('amount', 'setAmount', ''),
  withState('receiver', 'setReceiver', ''),
  withState('asset', 'setAsset', ({ DEFAULT_TOKEN }) => DEFAULT_TOKEN),

  withNetworkData(),
  withAuthData(),
  withData(feeActions, mapFeeDataToProps),
  withActions(sendActions, mapSendActionsToProps),

  withConfirm(),
  withInfoToast(),
  withSuccessToast(),
  withErrorToast(),

  withLoadingProp(sendActions, { propName: 'sending', strategy: pureStrategy }),
  withProgressChange(
    sendActions,
    LOADING,
    (state, props) => {
      if (props.signingFunction) {
        props.showInfoToast('Please sign the transaction on your Ledger');
      }
    },
    {
      strategy: pureStrategy
    }
  ),
  withProgressChange(
    sendActions,
    LOADED,
    (state, props) => {
      props.showSuccessToast(
        'Transaction added to blockchain, account balances will update shortly'
      );
      props.setAmount('0');
      props.setReceiver('');
    },
    {
      strategy: pureStrategy
    }
  ),
  withProgressChange(
    sendActions,
    FAILED,
    (state, props) => {
      props.showErrorToast(`Transaction failed. ${state.error}`);
    },
    {
      strategy: pureStrategy
    }
  )
)(Send);
