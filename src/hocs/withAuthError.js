import { compose } from 'recompose';
import { progressValues } from 'spunky';

import withAlert from './withAlert';
import withAuthChange from './withAuthChange';

const { FAILED } = progressValues;

export default compose(
  withAlert(),
  withAuthChange(FAILED, ({ error }, { alert }) => alert(`Authentication failed: ${error}`))
);
