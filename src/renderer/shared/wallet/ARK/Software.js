import { Identities } from '@arkecosystem/crypto';

export default class Software {
  constructor(child) {
    this.child = child;
  }

  getWallet = () => {
    return {
      address: Identities.Address.fromPublicKey(this.getPublicKey()),
      privateKey: this.getPrivateKey(),
      WIF: this.getWIF(),
      publicKey: this.getPublicKey()
    };
  };

  getPrivateKeyRaw = () => this.child.privateKey;

  getPrivateKey = () => this.child.privateKey.toString('hex');

  getWIF = () => this.child.toWIF();

  getPublicKeyRaw = () => this.child.publicKey;

  getPublicKey = () => this.child.publicKey.toString('hex');

  getAddress = () => Identities.Address.fromPublicKey(this.getPublicKey());

  //   getExtendedPrivateKey = () => this.child.toBase58();
}
