import { compose } from 'recompose';

import withActiveAccount from 'shared/hocs/withActiveAccount';
import { withInfoToast } from 'shared/hocs/withToast';

import Receive from './Receive';

export default compose(
  withActiveAccount(),
  withInfoToast()
)(Receive);
