import { ECDH, createHash, createDecipheriv, createHmac } from 'crypto';
import { wallet } from '@cityofzion/neon-js';

function aes256CbcDecrypt(iv, key, data) {
  const cipher = createDecipheriv('aes-256-cbc', key, iv);
  const firstChunk = cipher.update(data);
  const secondChunk = cipher.final();
  return Buffer.concat([firstChunk, secondChunk]);
}

export default function decrypt({ senderPublicKey, wif, iv, mac, data }) {
  const ecdh = ECDH('prime256v1');
  const recipientAccount = new wallet.Account(wif);
  const recipientPrivateKey = recipientAccount.privateKey;

  ecdh.setPrivateKey(recipientPrivateKey, 'hex');

  const sharedKey = ecdh.computeSecret(senderPublicKey, 'hex');
  const hash = createHash('sha512')
    .update(sharedKey)
    .digest();
  const encryptionKey = hash.slice(0, 32);
  const macKey = hash.slice(32);
  const ivBuffer = Buffer.from(iv, 'hex');
  const senderPublicKeyBuffer = Buffer.from(senderPublicKey, 'hex');
  const dataBuffer = Buffer.from(data, 'hex');
  const dataToMac = Buffer.concat([ivBuffer, senderPublicKeyBuffer, dataBuffer]);
  const realMac = createHmac('sha256', macKey)
    .update(dataToMac)
    .digest();

  if (!realMac.equals(Buffer.from(mac, 'hex'))) {
    throw new Error('Bad MAC');
  }

  return aes256CbcDecrypt(ivBuffer, encryptionKey, dataBuffer);
}
