import React from 'react';
import { string, objectOf, func } from 'prop-types';
import { map, noop } from 'lodash';

import Button from 'shared/components/Forms/Button';

import Tab from '../Tab';
import tabShape from '../../shapes/tabShape';
import styles from './Tabs.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    onOpen: func,
    onClose: func,
    setActiveTab: func
  };

  static defaultProps = {
    onOpen: noop,
    onClose: noop,
    setActiveTab: noop
  };

  render() {
    return (
      <div className={styles.tabs}>
        {map(this.props.tabs, this.renderTab)}
        <Button onClick={this.props.onOpen}>New Tab</Button>
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
}
