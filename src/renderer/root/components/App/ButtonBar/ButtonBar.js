import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { remote } from 'electron';

import Icon from 'shared/components/Icon';

import styles from './ButtonBar.scss';

export default class ButtonBar extends React.Component {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

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
    if (!this.showWindowIcons()) {
      return null;
    }

    return (
      <div className={classNames(styles.buttonBar, this.props.className)}>
        <button type="button" onClick={this.handleMinimizeWindow}>
          <Icon name="windowMin" />
        </button>
        <button type="button" onClick={this.handleMaximizeWindow}>
          <Icon name={this.state.isMaximized ? 'windowRestore' : 'windowMax'} />
        </button>
        <button type="button" onClick={this.handleCloseWindow}>
          <Icon name="windowClose" />
        </button>
      </div>
    );
  }

  handleMinimizeWindow = () => {
    this.getBrowserWindow().minimize();
  }

  handleMaximizeWindow = () => {
    const win = this.getBrowserWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

  handleCloseWindow = () => {
    this.getBrowserWindow().close();
  }

  showWindowIcons = () => {
    return process.platform !== 'darwin';
  }

  updateIsMax = () => {
    const win = this.getBrowserWindow();
    if (win) {
      this.setState({ isMaximized: win.isMaximized() });
    }
  }

  getBrowserWindow = () => {
    return remote.BrowserWindow.getFocusedWindow();
  }
}
