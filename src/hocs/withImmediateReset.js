import React from 'react';
import { func } from 'prop-types';
import { withActions } from 'spunky';
import { omit } from 'lodash';

const RESET_PROP = '__reset__';

const withImmediateReset = (
  actions,
  { propName = RESET_PROP, ...options } = {}
) => (Component) => {
  const mapResetToProps = ({ reset }) => ({
    [propName]: reset
  });

  class ConditionalCallComponent extends React.Component {
    static propTypes = {
      [propName]: func.isRequired
    };

    componentWillMount() {
      this.props[propName]();
    }

    render() {
      return <Component {...omit(this.props, propName)} />;
    }
  }

  return withActions(actions, mapResetToProps, { propName, ...options })(ConditionalCallComponent);
};

export default withImmediateReset;
