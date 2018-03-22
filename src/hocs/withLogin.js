import { progressValues } from 'spunky';

import withAuthChange from './withAuthChange';

const { LOADED } = progressValues;

export default function withLogin(callback) {
  return withAuthChange(LOADED, callback);
}
