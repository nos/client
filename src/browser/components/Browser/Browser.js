import React from 'react';
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
    const { tabs, activeSessionId, target, onQuery } = this.props;

    return (
      <div className={styles.browser}>
        <AddressBar className={styles.address} query={target} onQuery={onQuery} />

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
    return (
      <DAppContainer
        key={sessionId}
        className={styles.dapp}
        sessionId={sessionId}
        target={tab.target}
        addressBarEntry={tab.addressBarEntry}
        requestCount={tab.requestCount}
        active={sessionId === this.props.activeSessionId}
      />
    );
  }
}
