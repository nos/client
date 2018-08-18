import React from 'react';
import { Element, scrollSpy } from 'react-scroll';
import { StickyContainer, Sticky } from 'react-sticky';

import Page from 'shared/components/Page';
import Panel from 'shared/components/Panel';

import GeneralSettings from '../GeneralSettings';
import NetworkSettings from '../NetworkSettings';
import SidebarLink from '../SidebarLink';
import styles from './Settings.scss';

export default class Settings extends React.PureComponent {
  state = {
    offset: 0
  };

  componentDidMount() {
    this.setState({ offset: this.container.node.offsetTop });
    scrollSpy.update();
  }

  render() {
    return (
      <StickyContainer id="settingsContainer" ref={this.registerRef} className={styles.settings}>
        <Page className={styles.page}>
          <Panel className={styles.panel}>
            <div className={styles.sidebar}>
              <Sticky relative topOffset={this.state.offset}>
                {({ style }) => (
                  <ul style={style}>
                    <li>
                      <SidebarLink to="general" containerId="settingsContainer">
                        General
                      </SidebarLink>
                    </li>
                    <li>
                      <SidebarLink to="network" containerId="settingsContainer">
                        Network
                      </SidebarLink>
                    </li>
                  </ul>
                )}
              </Sticky>
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
      </StickyContainer>
    );
  }

  registerRef = (el) => {
    this.container = el;
  }
}
