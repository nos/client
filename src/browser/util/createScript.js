import Neon from '@cityofzion/neon-js';

import encode from './encodeArgs';

const createScript = (scriptHash, operation, rawArgs, encodeArgs) => {
  const args = encodeArgs ? encode(rawArgs) : rawArgs;

  const invoke = {
    scriptHash,
    operation,
    args
  };

  // Create script
  return Neon.create.script(invoke);
};

export default createScript;
