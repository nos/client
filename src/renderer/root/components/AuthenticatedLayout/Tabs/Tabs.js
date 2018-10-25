import React from 'react';
import classNames from 'classnames';
import { string, objectOf, func } from 'prop-types';
import { map, noop, keys } from 'lodash';
import { ipcRenderer } from 'electron';

import PlusIcon from 'shared/images/browser/plus.svg';
import tabShape from 'browser/shapes/tabShape';

import Tab from '../Tab';
import styles from './Tabs.scss';

export default class Tabs extends React.PureComponent {
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
    ipcRenderer.on('file:new-tab', this.handleOpenTab);
    ipcRenderer.on('file:close-tab', this.handleCloseActiveTab);
    ipcRenderer.on('window:goto-tab', this.handleGotoTab);
    ipcRenderer.on('window:next-tab', this.handleNextTab);
    ipcRenderer.on('window:previous-tab', this.handlePreviousTab);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file:new-tab');
    ipcRenderer.removeAllListeners('file:close-tab');
    ipcRenderer.removeAllListeners('window:goto-tab');
    ipcRenderer.removeAllListeners('window:next-tab');
    ipcRenderer.removeAllListeners('window:previous-tab');
  }

  render() {
    return (
      <div className={classNames(styles.tabs, this.props.className)}>
        {map(this.props.tabs, this.renderTab)}
        <PlusIcon className={styles.newTab} onClick={this.handleNewTab} />
      </div>
    );
  }

  renderTab = (tab, sessionId) => {
    const { target, title, type, icon, loading } = tab;

    return (
      <Tab
        key={sessionId}
        className={styles.tab}
        target={target}
        title={title}
        type={type}
        icon={icon}
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

  handleNewTab = () => {
    this.props.onOpen();
  }

  handleOpenTab = (event, target) => {
    this.props.onOpen(target);
  }

  handleCloseActiveTab = () => {
    this.props.onClose(this.props.activeSessionId);
  }

  handleGotoTab = (event, i) => {
    const sessionIds = keys(this.props.tabs);
    const sessionId = i === 'last' ? sessionIds[sessionIds.length - 1] : sessionIds[i - 1];

    if (sessionId) {
      this.props.setActiveTab(sessionId);
    }
  }

  handleNextTab = () => {
    this.incrementTab(1);
  }

  handlePreviousTab = () => {
    this.incrementTab(-1);
  }

  incrementTab = (offset) => {
    const sessionIds = keys(this.props.tabs);
    const currentIndex = sessionIds.indexOf(this.props.activeSessionId);

    if (currentIndex !== -1) {
      const newIndex = ((currentIndex + offset) + sessionIds.length) % sessionIds.length;
      this.props.setActiveTab(sessionIds[newIndex]);
    }
  }
}
