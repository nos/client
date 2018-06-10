import { compose, withProps } from 'recompose';
import { withProgress, progressValues } from 'spunky';

const { LOADING } = progressValues;

const PROGRESS_PROP: string = '__progress__';

export default function withLoadingProp(actions, { propName = 'loading', ...options } = {}) {
  return compose(
    withProgress(actions, { propName: PROGRESS_PROP, ...options }),
    withProps((props) => ({
      [propName]: props[PROGRESS_PROP] === LOADING
    }))
  );
}
