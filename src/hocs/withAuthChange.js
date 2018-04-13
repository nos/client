import React from 'react';
import { omit } from 'lodash';
import { compose } from 'recompose';
import { withData, withError, withProgress } from 'spunky';

import authActions from '../actions/authActions';

const DATA_PROP = '__authData__';
const ERROR_PROP = '__authError__';
const PROGRESS_PROP = '__authProgress__';

export default function withAuthChange(progress, callback) {
  const mapDataToProps = (data) => ({
    [DATA_PROP]: data
  });

  const mapErrorToProps = (error) => ({
    [ERROR_PROP]: error
  });

  return (Component) => {
    class WrappedComponent extends React.Component {
      componentWillReceiveProps(nextProps) {
        if (this.props[PROGRESS_PROP] !== progress && nextProps[PROGRESS_PROP] === progress) {
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
      withProgress(authActions, { propName: PROGRESS_PROP }),
      withData(authActions, mapDataToProps),
      withError(authActions, mapErrorToProps)
    )(WrappedComponent);
  };
}
