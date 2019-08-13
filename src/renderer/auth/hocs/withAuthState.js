import { compose, mapProps } from 'recompose';
import { progressValues } from 'spunky';
import { omit } from 'lodash';

const { LOADED } = progressValues;

export default function withAuthState() {
  return compose(
    mapProps((props) => ({
      ...omit(props, 'progress'),
      authenticated: props.progress === LOADED
    }))
  );
}
