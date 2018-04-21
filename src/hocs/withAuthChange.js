import authActions from '../actions/authActions';
import withProgressChange from './withProgressChange';

export default function withAuthChange(progress, callback) {
  return withProgressChange(authActions, progress, callback);
}
