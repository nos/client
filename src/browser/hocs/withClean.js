import React from 'react';
import { withActions } from 'spunky';
import { omit } from 'lodash';

const ACTION_PROP = '__clean__';

export default function withClean(actions, { propName = ACTION_PROP } = {}) {
  const mapActionsToProps = ({ clean }) => ({
    [propName]: clean
  });

  return (Component) => {
    class WithCleanComponent extends React.Component {
      componentWillUnmount() {
        this.props[propName]();
      }

      render() {
        return <Component {...omit(this.props, propName)} />;
      }
    }

    return withActions(actions, mapActionsToProps)(WithCleanComponent);
  };
}
