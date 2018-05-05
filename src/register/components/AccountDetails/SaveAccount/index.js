import { compose, withState } from 'recompose';

import withAlert from 'shared/hocs/withAlert';

import SaveAccount from './SaveAccount';

export default compose(
  withAlert(),
  withState('label', 'setLabel', ({ account }) => account.address)
)(SaveAccount);
