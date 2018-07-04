import React from 'react';
import classNames from 'classnames';
import { func, string, bool } from 'prop-types';
import { noop } from 'lodash';

import SidebarIcon from 'shared/images/icons/sidebar.svg';
import SidebarActiveIcon from 'shared/images/icons/sidebar-active.svg';
import BackIcon from 'shared/images/icons/back.svg';
import ForwardIcon from 'shared/images/icons/forward.svg';
import ReloadIcon from 'shared/images/icons/reload.svg';
import NotificationsIcon from 'shared/images/icons/notifications.svg';

import styles from './AddressBar.scss';

const RETURN_KEY = 13;

export default class AddressBar extends React.Component {
  static propTypes = {
    className: string,
    query: string,
    onQuery: func,
    onBack: func,
    onForward: func,
    onReload: func,
    onToggleSidebar: func,
    sidebarOpen: bool
  };

  static defaultProps = {
    className: null,
    query: '',
    onQuery: noop,
    onBack: noop,
    onForward: noop,
    onReload: noop,
    onToggleSidebar: noop,
    sidebarOpen: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.input.value = this.props.query;
      this.input.blur();
    }
  }

  render() {
    return (
      <div className={classNames(styles.addressBar, this.props.className)}>
        <div className={styles.buttonGroup}>
          {this.renderSidebarIcon()}
          <BackIcon className={styles.button} onClick={this.props.onBack} />
          <ForwardIcon className={styles.button} onClick={this.props.onForward} />
          <ReloadIcon className={styles.button} onClick={this.props.onReload} />
        </div>

        <input
          ref={this.registerRef}
          type="text"
          placeholder="Search or enter address"
          onKeyDown={this.handleKeyDown}
          defaultValue={this.props.query}
        />

        <div className={styles.buttonGroup}>
          <NotificationsIcon className={styles.button} />
        </div>
      </div>
    );
  }

  renderSidebarIcon = () => {
    if (this.props.sidebarOpen) {
      return (
        <SidebarActiveIcon
          className={classNames(styles.button, styles.selected)}
          onClick={this.props.onToggleSidebar}
        />
      );
    }

    return (
      <SidebarIcon
        className={styles.button}
        onClick={this.props.onToggleSidebar}
      />
    );
  }

  handleKeyDown = (event) => {
    if (event.which === RETURN_KEY) {
      this.props.onQuery(event.target.value);
    }
  }

  registerRef = (el) => {
    this.input = el;
  }
}
