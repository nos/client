import React from 'react';
import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

import Account from '../Account';

import styles from './Accounts.scss';

export default class Accounts extends React.PureComponent {
  static propTypes = {
    className: string,
    __progress__: string.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return (
      <div className={styles.accounts}>
        <div>
          <div className={styles.title}>My Account</div>
          <Account />
        </div>
        <div>
          <div className={styles.subtitle}>
            Accounts generated from Keychain
          </div>
          <Account />
          <Account />
          <Account />
          <Account />
          <Account />
        </div>
      </div>
    );
  }
}
