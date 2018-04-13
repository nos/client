import React from 'react';

import DAppContainer from './DAppContainer';
import styles from './Browser.scss';

export default function Browser(_props) {
  return (
    <div className={styles.browser}>
      <DAppContainer />
    </div>
  );
}
