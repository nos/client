import React from 'react';

import Page from 'shared/components/Page';

import NetworkPanel from '../NetworkPanel';
import styles from './Settings.scss';

export default function Settings() {
  return (
    <Page className={styles.settings}>
      <NetworkPanel />
    </Page>
  );
}
