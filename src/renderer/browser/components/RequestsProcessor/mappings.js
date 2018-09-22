import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import Invoke from './Invoke';
import TestInvoke from './TestInvoke';
import GetLastBlock from './GetLastBlock';
import GetStorage from './GetStorage';
import Send from './Send';
import ClaimGas from './ClaimGas';
import makeInvokeActions from '../../actions/makeInvokeActions';
import makeTestInvokeActions from '../../actions/makeTestInvokeActions';
import makeStorageActions from '../../actions/makeStorageActions';
import makeSendActions from '../../actions/makeSendActions';
import makeClaimActions from '../../actions/makeClaimActions';
import makeBalancesActions from '../../actions/makeBalancesActions';

const COMPONENT_MAP = {
  getAddress: GetAddress,
  getBalance: GetBalance,
  getStorage: GetStorage,
  testInvoke: TestInvoke,
  getLastBlock: GetLastBlock,
  invoke: Invoke,
  send: Send,
  claimGas: ClaimGas
};

const ACTIONS_MAP = {
  getStorage: makeStorageActions,
  getBalance: makeBalancesActions,
  testInvoke: makeTestInvokeActions,
  invoke: [makeInvokeActions, makeBalancesActions],
  send: makeSendActions,
  claimGas: makeClaimActions
};

const makeNullActions = () => null;

export function getComponent(channel) {
  const Component = COMPONENT_MAP[channel];

  if (!Component) {
    throw new Error(`Invalid channel: "${channel}"`);
  }

  return Component;
}

export function getActions(channel) {
  return ACTIONS_MAP[channel] || makeNullActions;
}
