import { u, wallet } from '@cityofzion/neon-js';

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
    if (wallet.isAddress(arg)) {
      return u.reverseHex(arg);
    } else if (Array.isArray(arg)) {
      return encodeArgs(arg); // nested arrays can be handled with recursion
    } else if (typeof arg === 'string') {
      return u.str2hexstring(arg);
    } else if (typeof arg === 'number') {
      return u.int2hex(arg);
    }

    return arg;
  });

  return encodedArgs;
};

export default encodeArgs;
