import React from 'react';
import { Route } from 'react-router-dom';
import { bool, func } from 'prop-types';
import { omit } from 'lodash';

export default class PrivateRoute extends React.PureComponent {
  static propTypes = {
    authenticated: bool,
    component: func.isRequired
  };

  static defaultProps = {
    authenticated: false
  };

  render() {
    return <Route {...omit(this.props, 'component')} render={this.renderRoute} />;
  }

  renderRoute = (props) => {
    const Component = this.props.component;

    if (this.props.authenticated) {
      return <Component {...props} />;
    } else {
      // TODO redirect to Auth (login/Rgister) component?
      return <Component {...props} />;
    }
  };
}
