import React from 'react';
import { compose } from 'recompose';
import { withData, withError, withProgress } from 'spunky';
import { omit, castArray } from 'lodash';

const DATA_PROP = '__authData__';
const ERROR_PROP = '__authError__';
const PROGRESS_PROP = '__authProgress__';

export default function withProgressChange(actions, progress, callback) {
  const progresses = castArray(progress);

  const mapDataToProps = (data) => ({
    [DATA_PROP]: data
  });

  const mapErrorToProps = (error) => ({
    [ERROR_PROP]: error
  });

  return (Component) => {
    class WrappedComponent extends React.Component {
      componentWillReceiveProps(nextProps) {
        if (!progresses.includes(this.props[PROGRESS_PROP])
            && progresses.includes(nextProps[PROGRESS_PROP])) {
          callback(this.getCallbackState(nextProps), this.getCallbackProps(nextProps));
        }
      }

      render() {
        const passDownProps = omit(this.props, DATA_PROP, PROGRESS_PROP);
        return <Component {...passDownProps} />;
      }

      getCallbackState = (props) => {
        return { data: props[DATA_PROP], error: props[ERROR_PROP] };
      }

      getCallbackProps = (props) => {
        return omit(props, DATA_PROP, ERROR_PROP, PROGRESS_PROP);
      }
    }

    return compose(
      withProgress(actions, { propName: PROGRESS_PROP }),
      withData(actions, mapDataToProps),
      withError(actions, mapErrorToProps)
    )(WrappedComponent);
  };
}
