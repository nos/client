import React from 'react';
import classNames from 'classnames';
import { string, objectOf, bool } from 'prop-types';
import { map } from 'lodash';

import isInternalPage from 'shared/util/isInternalPage';

import InternalPage from '../InternalPage';
import DAppContainer from '../DAppContainer';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default class Browser extends React.PureComponent {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    firstVisit: bool
  };

  static defaultProps = {
    firstVisit: false
  };

  render() {
    return <div className={styles.browser}>{this.renderTabs()}</div>;
  }

  renderTabs = () => {
    return map(this.props.tabs, this.renderTab);
  };

  renderTab = (tab, sessionId) => {
    if (isInternalPage(tab.type)) {
      return this.renderInternalPage(tab, sessionId);
    } else {
      return this.renderDApp(tab, sessionId);
    }
  };

  renderInternalPage = (tab, sessionId) => {
    if (sessionId !== this.props.activeSessionId) {
      return null;
    }

    return <InternalPage key={sessionId} active={this.isActive(sessionId)} tab={tab} />;
  };

  renderDApp = (tab, sessionId) => {
    const active = this.isActive(sessionId);
    const className = classNames(styles.dapp, { [styles.active]: active });
    const { firstVisit } = this.props;

    return (
      <DAppContainer
        key={sessionId}
        className={className}
        sessionId={sessionId}
        active={active}
        tab={firstVisit ? { ...tab, target: 'www.google.be' } : tab}
        firstVisit={firstVisit}
      />
    );
  };

  isActive = (sessionId) => {
    return sessionId === this.props.activeSessionId;
  };
}
