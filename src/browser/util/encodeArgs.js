import { u, wallet } from '@cityofzion/neon-js';
import tree from 'switch-tree';

const encodeArgs = (args) => {
  // assert args is an array
  if (!Array.isArray(args)) {
    return args;
  }

  // For now this takes care of strings and numbers and nested Arrays
  // Also this shouldn't be used when NEO addresses are passed for contracts using CheckWitness.
  // Until we determine what a good practice for general encoding addresses is
  // - using unhexlify + reverseHex + toScriptHash or just reverseHex as is used in this function -
  // but the former is necessary for contracts using CheckWitness
  // the latter is used from neon-js guides to checkBalance.
  // If the former can be used for those as well, this is no problem.
  const encodedArgs = args.map((arg) => {
    const executor = tree`
      lazy ${arg}
        expression ${wallet.isAddress} ${() => u.reverseHex(arg)}
        expression ${Array.isArray} ${() => encodeArgs(arg)}
        type ${'string'} ${() => u.str2hexstring(arg)}
        type ${1} ${() => u.int2hex(arg)}
    `;

    return executor();
  });

  return encodedArgs;
};

export default encodeArgs;
