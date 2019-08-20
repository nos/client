import { compose } from 'recompose';

import withActiveWallet from 'shared/hocs/withActiveWallet';
import { withInfoToast } from 'shared/hocs/withToast';

import Receive from './Receive';

export default compose(
  withActiveWallet(),
  withInfoToast()
)(Receive);
