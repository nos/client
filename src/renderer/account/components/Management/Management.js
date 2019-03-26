import React from 'react';
import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

import Accounts from './Accounts';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
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
      <Page className={styles.management}>
        <Accounts />
      </Page>
    );
  }
}
