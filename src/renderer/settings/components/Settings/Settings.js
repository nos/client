import React from 'react';
import { Element, scrollSpy } from 'react-scroll';

import Page from 'shared/components/Page';
import Panel from 'shared/components/Panel';

import GeneralSettings from '../GeneralSettings';
import NetworkSettings from '../NetworkSettings';
import SidebarLink from '../SidebarLink';
import styles from './Settings.scss';

export default class Settings extends React.PureComponent {
  componentDidMount() {
    scrollSpy.update();
  }

  render() {
    return (
      <div id="settingsContainer" className={styles.settings}>
        <Page className={styles.page} id="settingsContainer">
          <Panel className={styles.panel}>
            <div className={styles.sidebar}>
              <ul>
                <li>
                  <SidebarLink to="general" containerId="settingsContainer" offset={-24}>
                    General
                  </SidebarLink>
                </li>
                <li>
                  <SidebarLink to="network" containerId="settingsContainer" offset={-24}>
                    Network
                  </SidebarLink>
                </li>
              </ul>
            </div>

            <div className={styles.content}>
              <Element name="general">
                <GeneralSettings />
              </Element>
              <Element name="network">
                <NetworkSettings />
              </Element>
            </div>
          </Panel>
        </Page>
      </div>
    );
  }
}
