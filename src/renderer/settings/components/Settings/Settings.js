import React from 'react';

import Page from 'shared/components/Page';
import Panel from 'shared/components/Panel';

import GeneralSettings from '../GeneralSettings';
import NetworkSettings from '../NetworkSettings';
import styles from './Settings.scss';

export default function Settings() {
  return (
    <Page className={styles.settings}>
      <Panel className={styles.panel}>
        <GeneralSettings />
        <NetworkSettings />
      </Panel>
    </Page>
  );
}
