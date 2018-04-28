import React from 'react';
import { string, func } from 'prop-types';

import DAppContainer from './DAppContainer';
import styles from './Browser.scss';

export default function Browser(props) {
  return (
    <div className={styles.browser}>
      <DAppContainer query={props.query} doQuery={props.doQuery} />
    </div>
  );
}

Browser.propTypes = {
  query: string.isRequired,
  doQuery: func.isRequired
};
