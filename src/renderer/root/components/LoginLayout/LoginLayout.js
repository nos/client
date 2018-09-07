import React from 'react';
import { node } from 'prop-types';

import styles from './LoginLayout.scss';

export default class LoginLayout extends React.PureComponent {
  static displayName = 'LoginLayout';

  static propTypes = {
    children: node
  };

  static defaultProps = {
    children: null
  };

  render() {
    return (
      <div className={styles.loginLayout}>
        {this.props.children}
      </div>
    );
  }
}
