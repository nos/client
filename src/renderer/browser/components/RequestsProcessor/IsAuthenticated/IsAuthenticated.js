import React from 'react';
import { func, bool } from 'prop-types';

export default class IsAuthenticated extends React.PureComponent {
  static propTypes = {
    onResolve: func.isRequired,
    authenticated: bool
  };

  static defaultProps = {
    authenticated: false
  };

  componentDidMount() {
    const { authenticated, onResolve } = this.props;
    onResolve(authenticated);
  }

  render() {
    return null;
  }
}
