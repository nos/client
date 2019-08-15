import { compose, mapProps } from 'recompose';
import { progressValues, withProgress } from 'spunky';
import { omit } from 'lodash';

import authActions from 'auth/actions/authActions';

const { LOADED } = progressValues;

export default function withAuthState() {
  return compose(
    withProgress(authActions, { propName: 'authStateLoadingProgress' }),
    mapProps((props) => ({
      ...omit(props, 'authStateLoadingProgress'),
      authenticated: props.authStateLoadingProgress === LOADED
    }))
  );
}
