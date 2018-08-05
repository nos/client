import { compose } from 'recompose';
import { progressValues } from 'spunky';

import withErrorToast from 'shared/hocs/withErrorToast';
import withAuthChange from 'shared/hocs/withAuthChange';

const { FAILED } = progressValues;

export default compose(
  withErrorToast(),
  withAuthChange(FAILED, (state, props) => props.showToast(`Authentication failed: ${state.error}`))
);
