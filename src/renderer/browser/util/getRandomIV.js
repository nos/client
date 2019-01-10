import { randomBytes } from 'crypto';

export default function getRandomIV() {
  return randomBytes(16);
}
