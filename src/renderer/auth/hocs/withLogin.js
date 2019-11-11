import { progressValues, withData } from 'spunky';
import { compose } from 'recompose';

import withAuthChange from 'shared/hocs/withAuthChange';

import authActions from '../actions/authActions';

const { LOADED } = progressValues;

const mapAuthDataToProps = (auth) => ({ auth });

export default function withLogin(callback) {
  return compose(withData(authActions, mapAuthDataToProps), withAuthChange(LOADED, callback));
}
