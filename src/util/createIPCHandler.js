import getAddress from './handlers/getAddress';
import getBalance from './handlers/getBalance';

const HANDLERS = {
  getAddress,
  getBalance
};

export default function createIPCHandler(channel) {
  const handler = HANDLERS[channel];

  if (!handler) {
    throw new Error(`Invalid channel "${channel}"`);
  }

  return handler;
}
