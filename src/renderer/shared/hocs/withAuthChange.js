import authActions from 'auth/actions/authActions';

import withProgressChange from 'shared/hocs/withProgressChange';

export default function withAuthChange(progress, callback) {
  return withProgressChange(authActions, progress, callback);
}
