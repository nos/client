import { compose } from 'recompose';
import { withData } from 'spunky';

import withImmediateReset from 'shared/hocs/withImmediateReset';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withImmediateReset(createAccountActions),
  withData(createAccountActions, mapAccountDataToProps)
)(Register);
