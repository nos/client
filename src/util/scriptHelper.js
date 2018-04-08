import Neon, { u } from '@cityofzion/neon-js';

const s2h = u.str2hexstring;

const createScript = (scriptHash, operation, args) => {
  const myArgs = args.map((myArg) => s2h(myArg));

  const invoke = {
    scriptHash,
    operation,
    args: myArgs
  };

  // Create script
  return Neon.create.script(invoke);
};

export default createScript;
