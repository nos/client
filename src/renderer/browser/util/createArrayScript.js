import Neon from '@cityofzion/neon-js';

import encode from 'shared/util/encodeArgs';

const createArrayScript = (scripts, encodeArgs) => {
  const args = scripts.map((script) => {
    return encodeArgs ? encode(script) : script;
  });

  // Create script
  return Neon.create.script(args);
};

export default createArrayScript;
