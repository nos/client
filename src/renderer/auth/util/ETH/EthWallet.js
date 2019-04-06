import ethUtil from 'ethereumjs-utils';

export default class EthWallet {
  constructor(child, index) {
    this.child = child;
    this.index = index;
    this.type = 'ETH';
  }

  getWallet = () => ({
    privateKey: this.getPrivateKey(),
    publicKey: this.getPublicKey(),
    address: this.getAddress(),
    WIF: this.child.toWIF(),
    type: this.type,
    index: this.index
  });

  getPrivateKeyRaw = () => this.child.privateKey;

  getPrivateKey = () => this.child.privateKey.toString('hex');
  //   getPrivateKey = () => ethUtil.bufferToHex(this.getPrivateKeyRaw());

  getPublicKeyRaw = () => this.child.publicKey;

  getPublicKey = () => ethUtil.bufferToHex(this.child.publicKey);

  getAddressRaw = () => ethUtil.publicToAddress(this.child.publicKey, true);

  getAddress = () => ethUtil.bufferToHex(this.getAddressRaw());
}
