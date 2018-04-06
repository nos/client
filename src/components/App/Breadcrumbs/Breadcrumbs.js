import React from 'react';

import styles from './Breadcrumbs.scss';

export default function Breadcrumbs() {
  return (
    <div className={styles.breadCrumbs}>
      <ul>
        <li>Home</li>
        <li>Browser</li>
        <li>Example dApp</li>
      </ul>
    </div>
  );
}
