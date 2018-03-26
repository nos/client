// @flow
import React from 'react';
import { omit } from 'lodash';
import { compose } from 'recompose';
import { withData, withProgress, type Progress } from 'spunky';

import authActions from '../actions/authActions';

type Props = {
  [key: string]: any
};

const DATA_PROP = '__authData__';
const PROGRESS_PROP = '__authProgress__';

export default function withAuthChange(progress: Progress, callback: Function) {
  const mapDataToProps = (data) => ({
    [DATA_PROP]: data
  });

  return (Component: Class<React.Component<*>>) => {
    class WrappedComponent extends React.Component<Props> {
      componentWillReceiveProps(nextProps: Props) {
        if (this.props[PROGRESS_PROP] !== progress && nextProps[PROGRESS_PROP] === progress) {
          callback(nextProps[DATA_PROP], omit(nextProps, DATA_PROP, PROGRESS_PROP));
        }
      }

      render() {
        const passDownProps = omit(this.props, DATA_PROP, PROGRESS_PROP);
        return <Component {...passDownProps} />;
      }
    }

    return compose(
      withProgress(authActions, { propName: PROGRESS_PROP }),
      withData(authActions, mapDataToProps)
    )(WrappedComponent);
  };
}
