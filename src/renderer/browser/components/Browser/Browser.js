import React from 'react';
import classNames from 'classnames';
import { string, func, objectOf } from 'prop-types';
import { map } from 'lodash';

import Tabs from '../Tabs';
import AddressBar from '../AddressBar';
import DAppContainer from '../DAppContainer';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default class Browser extends React.Component {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    target: string.isRequired,
    onQuery: func.isRequired
  };

  render() {
    const { tabs, activeSessionId } = this.props;

    return (
      <div className={styles.browser}>
        <Tabs
          className={styles.tabs}
          tabs={tabs}
          activeSessionId={activeSessionId}
        />

        {this.renderSessions()}
      </div>
    );
  }

  renderSessions = () => {
    return map(this.props.tabs, this.renderSession);
  }

  renderSession = (tab, sessionId) => {
    const { target, onQuery, activeSessionId } = this.props;

    const className = classNames(styles.container, {
      [styles.active]: sessionId === activeSessionId
    });

    return (
      <div key={sessionId} className={className}>
        <AddressBar
          className={styles.address}
          query={target}
          onQuery={onQuery}
        />

        <DAppContainer
          className={styles.dapp}
          sessionId={sessionId}
          target={tab.target}
          addressBarEntry={tab.addressBarEntry}
          requestCount={tab.requestCount}
          errorCode={tab.errorCode}
          errorDescription={tab.errorDescription}
        />
      </div>
    );
  }
}
