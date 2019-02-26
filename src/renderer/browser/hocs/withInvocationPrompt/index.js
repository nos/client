import React from 'react';
import { compose } from 'recompose';
import { withCall, withData } from 'spunky';

import authActions from 'login/actions/authActions';
import withNetworkData from 'shared/hocs/withNetworkData';
import PriorityFee from 'account/components/Portfolio/TransactionsPanel/Send/PriorityFee';

import InvocationPrompt from './InvocationPrompt';
import withNullLoader from '../withNullLoader';
import withPrompt from '../withPrompt';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapBalancesDataToProps = (balances) => ({ balances });

export default function withInvocationPrompt(balancesActions) {
  return compose(
    withNetworkData(),
    withData(authActions, mapAuthDataToProps),
    withCall(balancesActions),
    withNullLoader(balancesActions),
    withData(balancesActions, mapBalancesDataToProps),
    withPrompt(InvocationPrompt, (props) => ({
      title: null,
      renderFooter: () => <PriorityFee {...props} editable={false} />
    }))
  );
}
