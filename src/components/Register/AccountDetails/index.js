import { compose, withState } from 'recompose';

import AccountDetails from './AccountDetails';
import withAlert from '../../../hocs/withAlert';

export default compose(
  withAlert(),
  withState('label', 'setLabel', ({ account }) => account.address)
)(AccountDetails);
