import { compose, withState } from 'recompose';

import SaveAccount from './SaveAccount';
import withAlert from '../../../../hocs/withAlert';

export default compose(
  withAlert(),
  withState('label', 'setLabel', ({ account }) => account.address)
)(SaveAccount);
