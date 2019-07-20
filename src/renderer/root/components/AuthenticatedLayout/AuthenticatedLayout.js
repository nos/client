import React from 'react';
import classNames from 'classnames';
import { string, func, node, objectOf } from 'prop-types';
import { noop } from 'lodash';

import Logo from 'shared/images/logo.svg';
import ScrollContainer from 'shared/components/ScrollContainer';
import isInternalPage from 'shared/util/isInternalPage';
import tabShape from 'browser/shapes/tabShape';

import Tabs from './Tabs';
import Navigation from './Navigation';
import AddressBar from './AddressBar';
import styles from './AuthenticatedLayout.scss';

const POLL_FREQUENCY = 14000; // milliseconds

export default class AuthenticatedLayout extends React.PureComponent {
  static propTypes = {
    activeSessionId: string.isRequired,
    tabs: objectOf(tabShape).isRequired,
    currentNetwork: string.isRequired,
    children: node,
    getLastBlock: func
  };

  static defaultProps = {
    children: null,
    getLastBlock: noop
  };

  state = {
    showSidebar: true
  };

  componentDidMount() {
    this.fetchAndPoll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentNetwork !== prevProps.currentNetwork) {
      this.fetchAndPoll();
    }
  }

  componentWillUnmount() {
    this.clearPoll();
  }

  render() {
    const { tabs, activeSessionId } = this.props;

    const className = classNames(styles.authenticatedLayout, {
      [styles[process.platform]]: true
    });

    return (
      <div className={className}>
        <header>
          {this.renderTrafficLights()}
          <Tabs className={styles.tabs} tabs={tabs} activeSessionId={activeSessionId} />
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

    const className = classNames(styles.sidebar, {
      [styles.expanded]: this.state.showSidebar
    });

    return <div className={className} />;
  };

  renderSidebar = () => {
    if (!this.state.showSidebar) {
      return null;
    }

    return (
      <div className={styles.sidebar}>
        <Logo className={styles.logo} />
        <Navigation className={styles.navigation} />
      </div>
    );
  };

  renderContent = () => {
    return (
      <div className={styles.container}>
        <AddressBar
          className={styles.addressBar}
          disabled={this.isInternalPage()}
          sidebarOpen={this.state.showSidebar}
          onToggleSidebar={this.handleToggleSidebar}
        />
        <ScrollContainer className={styles.content}>{this.props.children}</ScrollContainer>
      </div>
    );
  };

  handleToggleSidebar = () => {
    this.setState((prevState) => ({
      showSidebar: !prevState.showSidebar
    }));
  };

  fetchAndPoll = () => {
    this.clearPoll();
    this.props.getLastBlock();
    this.createPoll();
  };

  createPoll = () => {
    this.pollInterval = setInterval(this.props.getLastBlock, POLL_FREQUENCY);
  };

  clearPoll = () => {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  };

  isInternalPage = () => {
    const tab = this.props.tabs[this.props.activeSessionId];
    return isInternalPage(tab.type);
  };
}
