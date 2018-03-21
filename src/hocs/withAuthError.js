import { progressValues } from 'spunky';

import withAuthChange from './withAuthChange';

const { FAILED } = progressValues;

export default withAuthChange(FAILED, () => alert('Authentication failed.')); // eslint-disable-line no-alert
