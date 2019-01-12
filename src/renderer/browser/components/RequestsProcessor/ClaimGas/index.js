import React from 'react';
import { withData } from 'spunky';
import { compose } from 'recompose';

import authActions from 'login/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';
import withNetworkData from 'shared/hocs/withNetworkData';
import PriorityFee from 'account/components/TransactionsPanel/Send/PriorityFee';

import ClaimGas from './ClaimGas';
import withClean from '../../../hocs/withClean';
import withPrompt from '../../../hocs/withPrompt';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';
import withSignTransactionToast from '../../../hocs/withSignTransactionToast';

const mapAuthDataToProps = (data) => data;
const mapClaimDataToProps = (txid) => ({ txid });

export default function makeClaimGas(claimActions) {
  return compose(
    // Clean redux store when done
    withClean(claimActions),

    // Get the current network
    withNetworkData(),

    // Prompt user
    withPrompt(
      () => <span>Would you like to claim GAS?</span>,
      (props) => ({
        title: 'Claim',
        renderFooter: () => <PriorityFee {...props} editable={false} />
      })
    ),

    // Getting account data
    withData(authActions, mapAuthDataToProps),

    // Do invoke if user accepts
    withInitialCall(claimActions, ({ net, address, wif, publicKey, signingFunction }) => ({
      net,
      address,
      wif,
      publicKey,
      signingFunction
    })),

    withSignTransactionToast,
    withNullLoader(claimActions),
    withRejectMessage(claimActions, ({ error }) => `Could not claim GAS: ${error}`),
    withData(claimActions, mapClaimDataToProps)
  )(ClaimGas);
}
