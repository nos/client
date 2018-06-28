import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';
import { map } from 'lodash';

import Tabs from '../Tabs';
import Session from '../Session';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default class Browser extends React.Component {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired
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
    const { activeSessionId } = this.props;

    const className = classNames(styles.session, {
      [styles.active]: sessionId === activeSessionId
    });

    return (
      <Session
        key={sessionId}
        className={className}
        sessionId={sessionId}
        target={tab.target}
        addressBarEntry={tab.addressBarEntry}
        requestCount={tab.requestCount}
        errorCode={tab.errorCode}
        errorDescription={tab.errorDescription}
      />
    );
  }
}
