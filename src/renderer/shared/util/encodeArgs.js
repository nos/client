import { u, wallet } from '@cityofzion/neon-js';
import tree from 'switch-tree';

const encodeArgs = (args) => {
  // assert args is an array
  if (!Array.isArray(args)) {
    return args;
  }

  // We need to determine what a good practice for general encoding addresses is.
  // For now, this shouldn't be used when NEO addresses are passed for contracts using CheckWitness.
  const encodedArgs = args.map((arg) => {
    const isFixed8 = (input) => input instanceof u.Fixed8;

    const executor = tree`
      lazy ${arg}
        expression ${wallet.isAddress} ${() => u.reverseHex(wallet.getScriptHashFromAddress(arg))}
        expression ${Array.isArray} ${() => encodeArgs(arg)}
        type ${'string'} ${() => u.str2hexstring(arg)}
        type ${'number'} ${() => u.int2hex(arg)}
        expression ${isFixed8} => ${() => arg.toReverseHex()}
    `;
    return executor();
  });
  return encodedArgs;
};

export default encodeArgs;
