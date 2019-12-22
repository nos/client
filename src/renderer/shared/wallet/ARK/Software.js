import { Identities, Managers } from '@arkecosystem/crypto';

export default class Software {
  constructor(child) {
    this.child = child;
    // Managers.configManager.setFromPreset('devnet');
    // this.networkVersion = 0x17; // mainnet
    // this.networkVersion = 0x1e; // testnet
    // AMR4mzxAj2sf2kEg2MpH3Jzk5HbXQDjq9G
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
