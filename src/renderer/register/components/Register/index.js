import { compose, withState } from 'recompose';

import Register from './Register';

export default compose(
  withState('step', 'setStep', 1)
)(Register);
