import React from 'react';
import classNames from 'classnames';
import { string, objectOf } from 'prop-types';
import { map } from 'lodash';

import Session from '../Session';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default class Browser extends React.Component {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired
  };

  render() {
    return (
      <div className={styles.browser}>
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
