import React from 'react';
import classNames from 'classnames';
import { func, string, bool } from 'prop-types';
import { noop, isEmpty } from 'lodash';
import { ipcRenderer } from 'electron';

import SidebarIcon from 'shared/images/icons/sidebar.svg';
import SidebarActiveIcon from 'shared/images/icons/sidebar-active.svg';
import BackIcon from 'shared/images/icons/back.svg';
import ForwardIcon from 'shared/images/icons/forward.svg';
import ReloadIcon from 'shared/images/icons/reload.svg';
import NotificationsIcon from 'shared/images/icons/notifications.svg';

import styles from './AddressBar.scss';

export default class AddressBar extends React.PureComponent {
  static propTypes = {
    className: string,
    query: string,
    onQuery: func,
    onBack: func,
    onForward: func,
    onReload: func,
    onToggleSidebar: func,
    sidebarOpen: bool,
    disabled: bool
  };

  static defaultProps = {
    className: null,
    query: '',
    onQuery: noop,
    onBack: noop,
    onForward: noop,
    onReload: noop,
    onToggleSidebar: noop,
    sidebarOpen: true,
    disabled: false
  };

  componentDidMount() {
    ipcRenderer.on('file:open-location', this.handleOpenLocation);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.input.value = this.props.query;
      this.input.blur();
    }
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file:open-location');
  }

  render() {
    const { className, disabled, query, onBack, onForward, onReload } = this.props;

    const buttonClass = classNames(styles.button, { [styles.disabled]: disabled });

    return (
      <div className={classNames(styles.addressBar, className)}>
        <div className={styles.buttonGroup}>
          {this.renderSidebarIcon()}
          <BackIcon className={buttonClass} onClick={onBack} />
          <ForwardIcon className={buttonClass} onClick={onForward} />
          <ReloadIcon className={buttonClass} onClick={onReload} />
        </div>

        <input
          ref={this.registerRef}
          type="text"
          disabled={disabled}
          placeholder="Search or enter address"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          defaultValue={query}
        />

        <div className={styles.buttonGroup}>
          <NotificationsIcon className={classNames(buttonClass, { [styles.disabled]: true })} />
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

    return <SidebarIcon className={styles.button} onClick={this.props.onToggleSidebar} />;
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.onQuery(event.target.value);
    } else if (event.key === 'Escape') {
      this.input.value = this.props.query;
      this.input.select();
    }
  };

  handleMouseDown = () => {
    const selection = window.getSelection ? window.getSelection() : null;
    selection.empty();
  };

  handleMouseUp = () => {
    const selection = window.getSelection ? window.getSelection() : null;
    if (isEmpty(selection.toString())) {
      this.input.select();
    }
  };

  handleOpenLocation = () => {
    this.input.select();
    this.input.focus();
  };

  registerRef = (el) => {
    this.input = el;
  };
}
