import React from 'react';
import { string } from 'prop-types';
import { withCall, withProgress, progressValues } from 'spunky';
import { omit } from 'lodash';

import pureStrategy from './strategies/pureStrategy';

const { INITIAL } = progressValues;

const PROGRESS_PROP = '__progress__';

function defaultMapPropsToAction(props) {
  return props;
}

const withInitialCall = (
  actions,
  mapPropsToAction = defaultMapPropsToAction,
  { propName = PROGRESS_PROP, strategy = pureStrategy, ...options } = {}
) => (Component) => {
  class ConditionalCallComponent extends React.Component {
    static propTypes = {
      [propName]: string.isRequired
    };

    componentWillMount() {
      this.Component = this.createComponent(this.props);
    }

    componentWillReceiveProps(nextProps) {
      const progress = this.props[propName];
      const nextProgress = nextProps[propName];

      if (progress !== nextProgress && (progress === INITIAL || nextProgress === INITIAL)) {
        this.Component = this.createComponent(nextProps);
      }
    }

    render() {
      return <this.Component {...omit(this.props, propName)} />;
    }

    createComponent = (props) => {
      if (props[propName] === INITIAL) {
        return withCall(actions, mapPropsToAction)(Component);
      } else {
        return Component;
      }
    };
  }

  return withProgress(actions, { propName, strategy, ...options })(ConditionalCallComponent);
};

export default withInitialCall;
