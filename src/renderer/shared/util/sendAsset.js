import { NEO, NOS, ARK } from '../values/assets';
import sendARK from './ARK/sendARK';
import sendNEO from './NEO/sendNEO';

export default async function sendAsset(
  {
    net,
    asset,
    amount,
    receiver,
    account,
    address,
    wif,
    publicKey,
    signingFunction,
    remark,
    fee = 0
  },
  getBalance,
  doSendAsset,
  doInvoke,
  doGetRPCEndpoint
) {
  if (asset === ARK) {
    return sendARK(
      {
        net,
        asset,
        amount,
        receiver,
        address,
        wif,
        account,
        publicKey,
        signingFunction,
        remark,
        fee
      },
      getBalance,
      doSendAsset,
      doInvoke,
      doGetRPCEndpoint
    );
  } else if (asset === NEO || asset === NOS) {
    return sendNEO(
      { net, asset, amount, receiver, address, wif, publicKey, signingFunction, remark, fee },
      getBalance,
      doSendAsset,
      doInvoke,
      doGetRPCEndpoint
    );
  }
}
