import React from 'react';
import classNames from 'classnames';
import { string, objectOf, func } from 'prop-types';
import { map, noop } from 'lodash';

import Icon from 'shared/components/Icon';

import Tab from '../Tab';
import tabShape from '../../shapes/tabShape';
import styles from './Tabs.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    className: string,
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    onOpen: func,
    onClose: func,
    setActiveTab: func
  };

  static defaultProps = {
    className: null,
    onOpen: noop,
    onClose: noop,
    setActiveTab: noop
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleShortcuts, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleShortcuts);
  }

  render() {
    return (
      <div className={classNames(styles.tabs, this.props.className)}>
        {map(this.props.tabs, this.renderTab)}
        <Icon className={styles.newTab} name="add" onClick={this.props.onOpen} />
      </div>
    );
  }

  renderTab = (tab, sessionId) => {
    const { target, title, loading } = tab;

    return (
      <Tab
        key={sessionId}
        className={styles.tab}
        target={target}
        title={title}
        loading={loading}
        active={sessionId === this.props.activeSessionId}
        onClick={this.handleClick(sessionId)}
        onClose={this.handleClose(sessionId)}
      />
    );
  }

  handleClick = (sessionId) => {
    return () => {
      this.props.setActiveTab(sessionId);
    };
  }

  handleClose = (sessionId) => {
    return () => {
      this.props.onClose(sessionId);
    };
  }

  handleShortcuts = (event) => {
    const combinationKeyIsPressed = process.platform === 'darwin' ? event.metaKey : event.ctrlKey;

    // Command + w (close current tab or client)
    if (combinationKeyIsPressed && event.key === 'w') {
      if (Object.keys(this.props.tabs).length > 1) {
        // Prevent client to quit (default behavior)
        event.preventDefault();
        // Only close active tab if there is more than 1 tab added
        this.props.onClose(this.props.activeSessionId);
      }
    }

    // Command + t (open new tab)
    if (combinationKeyIsPressed && event.key === 't') {
      event.preventDefault();
      this.props.onOpen();
    }
  }
}
