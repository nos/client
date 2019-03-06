import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import AccountLoadingImage from 'shared/images/account/accountLoading.svg';

import styles from './BreakdownLoading.scss';

export default function BreakdownLoading(props) {
  return (
    <div className={classNames(styles.breakdownLoading, props.className)}>
      <div className={styles.heading}>
        <div className={styles.title}>Loading funds...</div>
        <div className={styles.description}>Please wait while we fetch your account</div>
      </div>
      <AccountLoadingImage />
    </div>
  );
}

BreakdownLoading.propTypes = {
  className: string
};

BreakdownLoading.defaultProps = {
  className: null
};
