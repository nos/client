import React from 'react';
import { withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import authActions from 'auth/actions/authActions';
import feeActions from 'settings/actions/feeActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import PriorityFee from 'account/components/Portfolio/TransactionsPanel/Send/PriorityFee';
import { ASSETS, NOS } from 'shared/values/assets';

import Send from './Send';
import withClean from '../../../hocs/withClean';
import withPrompt from '../../../hocs/withPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';
import withSignTransactionToast from '../../../hocs/withSignTransactionToast';

const mapFeeDataToProps = (fee) => ({ fee });
const mapAuthDataToProps = ({ wallet }) => wallet;
const mapSendDataToProps = (txid) => ({ txid });

const getAssetName = (assetId) => {
  const asset = ASSETS[`${assetId}`.toLowerCase()];
  if (assetId === NOS) {
    return 'NOS';
  }
  return asset ? asset.symbol : assetId;
};

const CONFIG_KEYS = ['asset', 'amount', 'receiver', 'remark'];

export default function makeSend(sendActions) {
  return compose(
    // Clean redux store when done
    withClean(sendActions),

    // Rename arguments given by the user
    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    // Get the current network, fee settings data, & account data
    withNetworkData(),
    withData(feeActions, mapFeeDataToProps),
    withData(authActions, mapAuthDataToProps),

    // Prompt user
    withPrompt(
      ({ amount, asset, receiver }) => (
        <span>
          Would you like to transfer {amount} {getAssetName(asset)} to address{' '}
          <strong>&ldquo;{receiver}&rdquo;</strong>?
        </span>
      ),
      (props) => ({
        title: 'Transfer',
        renderFooter: () => <PriorityFee {...props} editable={false} />
      })
    ),

    // Send assets & wait for success or failure
    withInitialCall(
      sendActions,
      ({
        net,
        amount,
        publicKey,
        asset,
        receiver,
        address,
        wif,
        remark,
        signingFunction,
        fee
      }) => ({
        net,
        amount,
        publicKey,
        asset,
        receiver,
        address,
        wif,
        remark,
        signingFunction,
        fee
      })
    ),
    withSignTransactionToast,
    withNullLoader(sendActions),
    withRejectMessage(
      sendActions,
      ({ amount, asset, receiver, error }) =>
        `Could not send ${amount} ${asset} to ${receiver}: ${error}`
    ),
    withData(sendActions, mapSendDataToProps)
  )(Send);
}
