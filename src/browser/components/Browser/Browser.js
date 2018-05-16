import React from 'react';
import { string, func, objectOf } from 'prop-types';

import Tabs from '../Tabs';
import AddressBar from '../AddressBar';
import DAppContainer from '../DAppContainer';
import tabShape from '../../shapes/tabShape';
import styles from './Browser.scss';

export default function Browser(props) {
  const { tabs, activeSessionId, target, onQuery } = props;

  return (
    <div className={styles.browser}>
      <AddressBar className={styles.address} query={target} onQuery={onQuery} />

      <Tabs className={styles.tabs} tabs={tabs} activeSessionId={activeSessionId} />

      <DAppContainer
        key={activeSessionId}
        className={styles.dapp}
        target={target}
        sessionId={activeSessionId}
      />
    </div>
  );
}

Browser.propTypes = {
  activeSessionId: string.isRequired,
  tabs: objectOf(tabShape).isRequired,
  target: string.isRequired,
  onQuery: func.isRequired
};
