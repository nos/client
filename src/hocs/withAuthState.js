import { compose, mapProps } from 'recompose';
import { withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import authActions from '../actions/authActions';

const { LOADED } = progressValues;

export default function withAuthState(propName = 'authenticated') {
  return compose(
    withProgress(authActions),
    mapProps((props) => ({ ...omit(props, 'progress'), [propName]: props.progress === LOADED }))
  );
}
