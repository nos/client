import React from 'react';
import { string, func, objectOf } from 'prop-types';

import Tabs from '../Tabs';
import AddressBar from '../AddressBar';
import DAppContainer from '../DAppContainer';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default function Browser(props) {
  const { tabs, activeSessionId, query, onQuery } = props;

  return (
    <div className={styles.browser}>
      <AddressBar className={styles.address} query={query} onQuery={onQuery} />

      <Tabs className={styles.tabs} tabs={tabs} activeSessionId={activeSessionId} />

      <DAppContainer
        key={activeSessionId}
        className={styles.dapp}
        query={query}
        sessionId={activeSessionId}
      />
    </div>
  );
}

Browser.propTypes = {
  activeSessionId: string.isRequired,
  tabs: objectOf(tabShape).isRequired,
  query: string.isRequired,
  onQuery: func.isRequired
};
