import React from 'react';
import { node } from 'prop-types';
import { ipcRenderer, shell } from 'electron';

import styles from './LoginLayout.scss';

export default class LoginLayout extends React.PureComponent {
  static displayName = 'LoginLayout';

  static propTypes = {
    children: node
  };

  static defaultProps = {
    children: null
  };

  componentDidMount() {
    ipcRenderer.on('file:new-tab', this.handleOpenTab);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file:new-tab');
  }

  render() {
    return <div className={styles.loginLayout}>{this.props.children}</div>;
  }

  handleOpenTab = (event, target) => {
    if (target) {
      shell.openExternal(target);
    }
  };
}
