import crypto from 'crypto';

export default function decrypt(text, password) {
  const hash = crypto
    .createHash('sha512')
    .update(password)
    .digest();
  const key = hash.slice(0, 32);

  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
