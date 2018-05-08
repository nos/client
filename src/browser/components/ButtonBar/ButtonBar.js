import React from 'react';
import { remote } from 'electron';

import Icon from 'shared/components/Icon';

import styles from './ButtonBar.scss';

export default class ButtonBar extends React.Component {
  state = {
    isMaximized: false
  };

  componentDidMount() {
    this.updateIsMax();
    window.addEventListener('resize', this.updateIsMax);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMax);
  }

  render() {
    return (
      <div className={styles.buttonBar}>
        <button>
          <Icon name="notifications" />
        </button>
        {this.renderWindowIcons()}
      </div>
    );
  }

  renderWindowIcons = () => {
    if (!this.showWindowIcons()) {
      return null;
    }

    return [
      <button onClick={this.handleMinimizeWindow} key="min">
        <Icon name="windowMin" />
      </button>,
      <button onClick={this.handleResizeWindow} key="max">
        <Icon name={this.state.isMaximized ? 'windowRestore' : 'windowMax'} />
      </button>,
      <button onClick={this.handleCloseWindow} key="close">
        <Icon name="windowClose" />
      </button>
    ];
  }

  handleMinimizeWindow = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  }

  handleResizeWindow = () => {
    const win = remote.BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

  handleCloseWindow = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  }

  showWindowIcons = () => {
    return process.platform !== 'darwin';
  }

  updateIsMax = () => {
    const win = remote.BrowserWindow.getFocusedWindow();
    if (win) {
      this.setState({ isMaximized: win.isMaximized() });
    }
  }
}
