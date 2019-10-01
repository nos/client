import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { remote } from 'electron';
import { debounce } from 'lodash';

import CloseIcon from 'shared/images/icons/close.svg';
import MinimizeIcon from 'shared/images/icons/minimize.svg';
import WindowRestoreIcon from 'shared/images/icons/windowRestore.svg';
import WindowMaximizeIcon from 'shared/images/icons/windowMaximize.svg';

import styles from './ButtonBar.scss';

export default class ButtonBar extends React.PureComponent {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

  state = {
    isMaximized: true
  };

  componentDidMount() {
    this.handleUpdateMaximized();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    if (!this.showWindowIcons()) {
      return null;
    }

    return (
      <div className={classNames(styles.buttonBar, this.props.className)}>
        <button type="button" onClick={this.handleMinimizeWindow}>
          <MinimizeIcon name="windowMin" />
        </button>
        <button type="button" onClick={this.handleMaximizeWindow}>
          {this.state.isMaximized ? (
            <WindowRestoreIcon name="windowRestore" />
          ) : (
            <WindowMaximizeIcon name="windowMaximize" />
          )}
        </button>
        <button className={styles.closeButton} type="button" onClick={this.handleCloseWindow}>
          <CloseIcon name="windowClose" />
        </button>
      </div>
    );
  }

  handleMinimizeWindow = () => {
    this.getBrowserWindow().minimize();
  };

  handleMaximizeWindow = () => {
    const win = this.getBrowserWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  };

  handleCloseWindow = () => {
    this.getBrowserWindow().close();
  };

  handleUpdateMaximized = () => {
    const win = this.getBrowserWindow();
    if (win) {
      this.setState({ isMaximized: win.isMaximized() });
    }
  };

  handleResize = debounce(this.handleUpdateMaximized, 250);

  showWindowIcons = () => {
    return process.platform !== 'darwin';
  };

  getBrowserWindow = () => {
    return remote.BrowserWindow.getFocusedWindow();
  };
}
