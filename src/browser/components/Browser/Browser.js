import React from 'react';
import { string, func } from 'prop-types';

import AddressBar from '../AddressBar';
import DAppContainer from '../DAppContainer';
import styles from './Browser.scss';

export default function Browser(props) {
  return (
    <div className={styles.browser}>
      <AddressBar className={styles.address} query={props.query} onQuery={props.onQuery} />
      <DAppContainer className={styles.dapp} sessionId={props.sessionId} query={props.query} />
    </div>
  );
}

Browser.propTypes = {
  sessionId: string.isRequired,
  query: string.isRequired,
  onQuery: func.isRequired
};
