import { compose } from 'recompose';

import withForwardedRef from 'shared/hocs/withForwardedRef';
import withInputHighlight from 'shared/hocs/withInputHighlight';

import AddressInput from './AddressInput';

export default compose(
  withForwardedRef(),
  withInputHighlight
)(AddressInput);
