import React from 'react';
import classNames from 'classnames';
import { string, node, objectOf } from 'prop-types';

import logo from 'shared/images/logo.svg';
import tabShape from 'browser/shapes/tabShape';

import Tabs from './Tabs';
import Navigation from './Navigation';
import AddressBar from './AddressBar';
import styles from './AuthenticatedLayout.scss';

export default class AuthenticatedLayout extends React.Component {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    currentNetwork: string.isRequired,
    children: node
  };

  static defaultProps = {
    children: null
  };

  state = {
    showSidebar: true
  };

  render() {
    const { tabs, activeSessionId } = this.props;

    const className = classNames(styles.authenticatedLayout, {
      [styles[process.platform]]: true
    });

    return (
      <div className={className}>
        <header>
          {this.renderTrafficLights()}
          <Tabs
            className={styles.tabs}
            tabs={tabs}
            activeSessionId={activeSessionId}
          />
        </header>

        <main>
          {this.renderSidebar()}
          {this.renderContent()}
        </main>
      </div>
    );
  }

  renderTrafficLights = () => {
    if (!this.state.showSidebar && process.platform !== 'darwin') {
      return null;
    }

    return <div className={styles.sidebar} />;
  }

  renderSidebar = () => {
    if (!this.state.showSidebar) {
      return null;
    }

    return (
      <div className={styles.sidebar}>
        <img
          className={styles.logo}
          src={logo}
          alt="nOS Logo"
          width="36"
          height="36"
        />
        <Navigation
          className={styles.navigation}
        />
      </div>
    );
  }

  renderContent = () => {
    const { currentNetwork, children } = this.props;

    return (
      <div className={styles.container}>
        <AddressBar
          className={styles.addressBar}
          sidebarOpen={this.state.showSidebar}
          onToggleSidebar={this.handleToggleSidebar}
        />
        <div className={styles.content}>
          {children}
        </div>
        <footer className={styles.footer}>
          Network: {currentNetwork}
        </footer>
      </div>
    );
  }

  handleToggleSidebar = () => {
    this.setState((prevState) => ({
      showSidebar: !prevState.showSidebar
    }));
  }
}
