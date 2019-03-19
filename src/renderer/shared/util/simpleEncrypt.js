import crypto from 'crypto';

const IV_LENGTH = 16;

export default function encrypt(text, password) {
  const hash = crypto
    .createHash('sha512')
    .update(password)
    .digest();
  const key = hash.slice(0, 32);

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encrypted = cipher.update(text);
  const result = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${result.toString('hex')}`;
}
