import React from 'react';
import { string, func } from 'prop-types';

import Page from 'shared/components/Page';

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
      <div className={styles.account}>
        <Page className={styles.content}>
          <div> HEY </div>
        </Page>
      </div>
    );
  }
}
