import ethUtil from 'ethereumjs-utils';

export default class EthWallet {
  constructor(child) {
    this.child = child;
    this.type = 'ETH';
  }

  getWallet = () => ({
    privateKey: this.getPrivateKey(),
    publicKey: this.getPublicKey(),
    address: this.getAddress(),
    test: this.child.toWIF()
  });

  getPrivateKeyRaw = () => this.child.privateKey;

  getPrivateKey = () => this.child.privateKey.toString('hex');
  //   getPrivateKey = () => ethUtil.bufferToHex(this.getPrivateKeyRaw());

  getPublicKeyRaw = () => this.child.publicKey;

  getPublicKey = () => ethUtil.bufferToHex(this.child.publicKey);

  getAddressRaw = () => ethUtil.publicToAddress(this.child.publicKey, true);

  getAddress = () => ethUtil.bufferToHex(this.getAddressRaw());
}
