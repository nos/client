import Neon from '@cityofzion/neon-js';

import encode from 'shared/util/encodeArgs';

const createArrayScript = (scripts, encodeArgs) => {
  const invokeScripts = scripts.map(({ args, ...restProps }) => {
    return { ...restProps, args: encodeArgs ? encode(args) : args };
  });

  // Create script
  return Neon.create.script(invokeScripts);
};

export default createArrayScript;
