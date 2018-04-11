import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import Invoke from './Invoke';
import TestInvoke from './TestInvoke';
import GetStorage from './GetStorage';
import Send from './Send';
import ClaimGas from './ClaimGas';
import makeInvokeActions from '../../actions/dapps/makeInvokeActions';
import makeTestInvokeActions from '../../actions/dapps/makeTestInvokeActions';
import makeStorageActions from '../../actions/dapps/makeStorageActions';
import makeSendActions from '../../actions/dapps/makeSendActions';
import makeClaimActions from '../../actions/dapps/makeClaimActions';

const COMPONENT_MAP = {
  getAddress: GetAddress,
  getBalance: GetBalance,
  getStorage: GetStorage,
  testInvoke: TestInvoke,
  invoke: Invoke,
  send: Send,
  claimGas: ClaimGas
};

const ACTIONS_MAP = {
  getStorage: makeStorageActions,
  testInvoke: makeTestInvokeActions,
  invoke: makeInvokeActions,
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
