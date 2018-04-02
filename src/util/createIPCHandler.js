import getAddress from './handlers/getAddress';
import getBalance from './handlers/getBalance';
import testInvoke from './handlers/testInvoke';

const HANDLERS = {
  getAddress,
  getBalance,
  testInvoke
};

export default function createIPCHandler(channel) {
  const handler = HANDLERS[channel];

  if (!handler) {
    throw new Error(`Invalid channel "${channel}"`);
  }

  return handler;
}
