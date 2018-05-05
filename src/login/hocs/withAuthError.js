import { compose } from 'recompose';
import { progressValues } from 'spunky';

import withAlert from 'shared/hocs/withAlert';
import withAuthChange from 'shared/hocs/withAuthChange';

const { FAILED } = progressValues;

export default compose(
  withAlert(),
  withAuthChange(FAILED, ({ error }, { alert }) => alert(`Authentication failed: ${error}`))
);
