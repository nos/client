import withAuthState from 'auth/hocs/withAuthState';

import IsAuthenticated from './IsAuthenticated';

export default function makeIsAuthenticated() {
  return withAuthState()(IsAuthenticated);
}
