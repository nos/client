import { progressValues } from 'spunky';

import withAuthChange from './withAuthChange';

const { INITIAL } = progressValues;

export default function withLogout(callback) {
  return withAuthChange(INITIAL, callback);
}
