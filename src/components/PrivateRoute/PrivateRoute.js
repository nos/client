import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { omit } from 'lodash';

export default class PrivateRoute extends React.Component {
  static propTypes = {
    authenticated: bool,
    component: func.isRequired
  };

  static defaultProps = {
    authenticated: false
  };

  render() {
    return (
      <Route
        {...omit(this.props, 'authenticated', 'component')}
        render={this.renderRoute}
      />
    );
  }

  renderRoute = (props) => {
    if (this.props.authenticated) {
      const Component = this.props.component;
      return <Component {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
