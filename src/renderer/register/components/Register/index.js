import { compose } from 'recompose';
import { withData } from 'spunky';

import withUnmountReset from 'shared/hocs/withUnmountReset';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withUnmountReset(createAccountActions),
  withData(createAccountActions, mapAccountDataToProps)
)(Register);
