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

import AddressInput from '../AddressInput';
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

  input = React.createRef();

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.input.current.value = this.props.query;
      this.input.current.blur();
    }
  }

  render() {
    const { className, disabled, query, onQuery, onBack, onForward, onReload } = this.props;

    const buttonClass = classNames(styles.button, { [styles.disabled]: disabled });

    return (
      <div className={classNames(styles.addressBar, className)}>
        <div className={styles.buttonGroup}>
          {this.renderSidebarIcon()}
          <BackIcon className={buttonClass} onClick={onBack} />
          <ForwardIcon className={buttonClass} onClick={onForward} />
          <ReloadIcon className={buttonClass} onClick={onReload} />
        </div>

        <AddressInput
          ref={this.input}
          disabled={disabled}
          defaultValue={query}
          onQuery={onQuery}
        />

        <div className={styles.buttonGroup}>
          <NotificationsIcon className={buttonClass} />
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
  };
}
