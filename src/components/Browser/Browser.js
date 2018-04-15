import React from 'react';
import { string, func } from 'prop-types';

import DAppContainer from './DAppContainer';
import styles from './Browser.scss';

export default function Browser(props) {
  return (
    <div className={styles.browser}>
      <DAppContainer src={props.src} query={props.query} doQuery={props.doQuery} />
    </div>
  );
}

Browser.propTypes = {
  src: string.isRequired,
  query: string.isRequired,
  doQuery: func.isRequired
};
