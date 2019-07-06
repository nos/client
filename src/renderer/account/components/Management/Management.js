import React from 'react';
import { string, func, any } from 'prop-types';

import Page from 'shared/components/Page';

import Accounts from './Accounts';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    __progress__: string.isRequired,
    showErrorToast: func.isRequired,
    wallets: any // TODO any
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  // TODO change to function component
  render() {
    console.log('daw', this.props);
    const { wallets, account: { accountLabel } } = this.props;

    return (
      <Page className={styles.management}>
        <Accounts wallets={wallets ? wallets[accountLabel] : null} />
      </Page>
    );
  }
}
