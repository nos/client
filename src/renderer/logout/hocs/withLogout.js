import { progressValues } from 'spunky';

import withAuthChange from 'shared/hocs/withAuthChange';

const { INITIAL } = progressValues;

export default function withLogout(callback) {
  return withAuthChange(INITIAL, callback);
}
