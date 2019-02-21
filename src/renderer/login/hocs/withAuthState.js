import { compose, mapProps } from 'recompose';
import { withProgress, progressValues, withData } from 'spunky';
import { omit } from 'lodash';

import authActions from '../actions/authActions';

const { LOADED } = progressValues;

// const mapAuthDataToProps = ({ authenticated }) => ({ authenticated });
const mapAuthDataToProps = () => ({ authenticated: false });

export default function withAuthState() {
  return compose(withData(authActions, mapAuthDataToProps));
}
