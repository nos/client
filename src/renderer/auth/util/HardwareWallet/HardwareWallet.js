
import { NEO, ETH } from 'shared/values/chains';

import { signWithLedger } from '../NEO/NeoLedger';

import { publicKeyToAddress } from '../NEO/Utils';

// TODO extract to NeoHardwareWallet file
const NeoHardwareWallet = ({ wallet }) => {
  const { publicKey } = wallet;
  const address = publicKeyToAddress(publicKey);

  return {
    ...wallet,
    publicKey,
    address,
    signingFunction: signWithLedger
  };
};

const hardwareWallet = ({ wallet }) => {
  const { chainId } = wallet;

  switch (chainId) {
    case NEO:
      return NeoHardwareWallet({ wallet });
    default:
      throw new Error('Coin not supported.');
  }
};


export default hardwareWallet;
