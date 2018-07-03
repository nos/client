import React from 'react';
import { string, node } from 'prop-types';
import classNames from 'classnames';

import logo from 'shared/images/logo.svg';

import Navigation from './Navigation';
import AddressBar from './AddressBar';
import styles from './AuthenticatedLayout.scss';

export default function AuthenticatedLayout(props) {
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
  children: node,
  currentNetwork: string.isRequired
};

AuthenticatedLayout.defaultProps = {
  children: null
};
