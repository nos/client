import GetAddress from './GetAddress';
import GetBalance from './GetBalance';
import Invoke from './Invoke';
import TestInvoke from './TestInvoke';
import GetLastBlock from './GetLastBlock';
import GetStorage from './GetStorage';
import Send from './Send';
import ClaimGas from './ClaimGas';
import GetPublicKey from './GetPublicKey';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';
import CurrentNetwork from './CurrentNetwork';
import LocalCurrency from './LocalCurrency';
import IsAuthenticated from './IsAuthenticated';
import makeInvokeActions from '../../actions/makeInvokeActions';
import makeTestInvokeActions from '../../actions/makeTestInvokeActions';
import makeStorageActions from '../../actions/makeStorageActions';
import makeSendActions from '../../actions/makeSendActions';
import makeClaimActions from '../../actions/makeClaimActions';
import makeBalancesActions from '../../actions/makeBalancesActions';
import makePublicKeyActions from '../../actions/makePublicKeyActions';
import makeEncryptActions from '../../actions/makeEncryptActions';
import makeDecryptActions from '../../actions/makeDecryptActions';
import makeCurrentNetworkActions from '../../actions/makeCurrentNetworkActions';
import makeLocalCurrencyActions from '../../actions/makeLocalCurrencyActions';

const COMPONENT_MAP = {
  isAuthenticated: IsAuthenticated,
  // Getters
  getAddress: GetAddress,
  getBalance: GetBalance,
  getStorage: GetStorage,
  getPublicKey: GetPublicKey,
  getCurrentNetwork: CurrentNetwork,
  getLocalCurrency: LocalCurrency,
  // Encryption
  encrypt: Encrypt,
  decrypt: Decrypt,
  // Invocations
  invoke: Invoke,
  testInvoke: TestInvoke,
  send: Send,
  claimGas: ClaimGas,
  // Events
  getLastBlock: GetLastBlock
};

const ACTIONS_MAP = {
  // Getters
  getBalance: makeBalancesActions,
  getStorage: makeStorageActions,
  getPublicKey: makePublicKeyActions,
  getCurrentNetwork: makeCurrentNetworkActions,
  getLocalCurrency: makeLocalCurrencyActions,
  // Encryption
  encrypt: makeEncryptActions,
  decrypt: makeDecryptActions,
  // Invocations
  invoke: [makeInvokeActions, makeBalancesActions],
  testInvoke: makeTestInvokeActions,
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
