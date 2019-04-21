import { wallet } from '@cityofzion/neon-js';

export default class NeoWallet {
  constructor(child, index) {
    this.child = child;
    this.index = index;
    this.type = 'NEO';
  }

  getWallet = () => {
    const { address, privateKey, WIF, publicKey } = new wallet.Account(
      this.getPrivateKey()
    );

    return {
      address,
      privateKey,
      WIF,
      publicKey,
      type: this.type,
      index: this.index
    };
  };

  getPrivateKeyRaw = () => this.child.privateKey;

  getPrivateKey = () => this.child.privateKey.toString('hex');

  //   getPublicKeyRaw = () => this.child.publicKey;

  //   getPublicKey = () => ethUtil.bufferToHex(this.child.publicKey);

  //   getAddressRaw = () => ethUtil.publicToAddress(this.child.publicKey, true);

  //   getAddress = () => ethUtil.bufferToHex(this.getAddressRaw());
}
