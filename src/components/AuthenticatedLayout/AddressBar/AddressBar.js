/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string, shape } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { remote } from 'electron';

import Icon from '../../Icon';
import styles from './AddressBar.scss';

const RETURN_KEY = 13;

const historyShape = shape({
  push: func.isRequired
});

export default class AddressBar extends React.Component {
  static propTypes = {
    doQuery: func.isRequired,
    query: string,
    history: historyShape.isRequired
  };

  static defaultProps = {
    query: null
  };

  searchInput = React.createRef();

  state = {
    isMaximized: false
  };

  componentDidMount() {
    this.updateIsMax();
    window.addEventListener('resize', this.updateIsMax);
  }

  componentDidUpdate(prevProps, _prevState) {
    if (this.props.query !== prevProps.query) {
      this.searchInput.current.value = this.props.query;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMax);
  }

  render() {
    const showWindowIcons = process.platform !== 'darwin';
    return (
      <div className={styles.addressBar}>
        <input
          type="text"
          placeholder="Search or enter address"
          onKeyUp={this.handleKeyUp}
          ref={this.searchInput}
          defaultValue={this.props.query}
        />
        <div className={styles.buttonBar}>
          <button>
            <Icon name="notifications" />
          </button>
          <NavLink to="/settings">
            <Icon name="settings" />
          </NavLink>
          {showWindowIcons && [
            <button onClick={this.handleMinimizeWindow} key="min">
              <Icon name="windowMin" />
            </button>,
            <button onClick={this.handleResizeWindow} key="max">
              <Icon name={this.state.isMaximized ? 'windowRestore' : 'windowMax'} />
            </button>,
            <button onClick={this.handleCloseWindow} key="close">
              <Icon name="windowClose" />
            </button>
          ]}
        </div>
      </div>
    );
  }

  handleKeyUp = (event) => {
    const { query, doQuery } = this.props;

    if (event.which === RETURN_KEY) {
      const { value } = event.target;

      if (value !== query) {
        doQuery(value);
      }
      this.props.history.push('/browser');
    }
  };

  handleMinimizeWindow = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  };

  handleResizeWindow = () => {
    const win = remote.BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  };

  handleCloseWindow = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  };

  updateIsMax = () => {
    const win = remote.BrowserWindow.getFocusedWindow();
    if (win) {
      this.setState({ isMaximized: win.isMaximized() });
    }
  };
}
