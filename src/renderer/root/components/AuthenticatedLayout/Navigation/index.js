import { compose } from 'recompose';

import withAuthState from 'auth/hocs/withAuthState';

import Navigation from './Navigation';

export default compose(withAuthState())(Navigation);
