import React from 'react';
import { compose } from 'recompose';
import { withData, withError, withProgress } from 'spunky';
import { omit, castArray, uniqueId } from 'lodash';

const DATA_PROP = '__authData__';
const ERROR_PROP = '__authError__';
const PROGRESS_PROP = '__authProgress__';

export default function withProgressChange(actions, progress, callback, options = {}) {
  const progresses = castArray(progress);

  const dataProp = uniqueId(DATA_PROP);
  const errorProp = uniqueId(ERROR_PROP);
  const progressProp = uniqueId(PROGRESS_PROP);

  const mapDataToProps = (data) => ({
    [dataProp]: data
  });

  const mapErrorToProps = (error) => ({
    [errorProp]: error
  });

  return (Component) => {
    class WrappedComponent extends React.PureComponent {
      componentWillReceiveProps(nextProps) {
        if (!progresses.includes(this.props[progressProp]) &&
            progresses.includes(nextProps[progressProp])) {
          callback(
            this.getCallbackState(nextProps),
            this.getCallbackProps(nextProps),
            this.getCallbackProps(this.props)
          );
        }
      }

      render() {
        const passDownProps = omit(this.props, dataProp, errorProp, progressProp);
        return <Component {...passDownProps} />;
      }

      getCallbackState = (props) => {
        return { data: props[dataProp], error: props[errorProp] };
      }

      getCallbackProps = (props) => {
        return omit(props, dataProp, errorProp, progressProp);
      }
    }

    return compose(
      withProgress(actions, { ...options, propName: progressProp }),
      withData(actions, mapDataToProps),
      withError(actions, mapErrorToProps)
    )(WrappedComponent);
  };
}
