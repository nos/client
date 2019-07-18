import { compose, withState } from 'recompose';

import Login from './Login';

export default compose(withState('selectedSecretWord', 'setSelectedSecretWord', ''))(Login);
