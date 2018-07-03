import React from 'react';
import classNames from 'classnames';
import { string, node, objectOf } from 'prop-types';

import logo from 'shared/images/logo.svg';
import tabShape from 'browser/shapes/tabShape';

import Tabs from './Tabs';
import Navigation from './Navigation';
import AddressBar from './AddressBar';
import styles from './AuthenticatedLayout.scss';

export default function AuthenticatedLayout(props) {
  const { tabs, activeSessionId } = props;

  const className = classNames(styles.authenticatedLayout, {
    [styles[process.platform]]: true
  });

  return (
    <div className={className}>
      <div className={styles.menu}>
        <header>
          <img src={logo} alt="nOS Logo" width="36" height="36" />
        </header>
        <Navigation />
      </div>
      <main className={styles.main}>
        <Tabs
          className={styles.tabs}
          tabs={tabs}
          activeSessionId={activeSessionId}
        />
        <AddressBar className={styles.addressBar} />
        <div className={styles.content}>
          {props.children}
        </div>
        <footer className={styles.footer}>
          <div className={styles.status}>
            Network: {props.currentNetwork}
          </div>
        </footer>
      </main>
    </div>
  );
}

AuthenticatedLayout.displayName = 'AuthenticatedLayout';

AuthenticatedLayout.propTypes = {
  activeSessionId: string.isRequired,
  tabs: objectOf(tabShape).isRequired,
  currentNetwork: string.isRequired,
  children: node
};

AuthenticatedLayout.defaultProps = {
  children: null
};
