import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import Panel from 'shared/components/Panel';

import styles from './TransactionsLoading.scss';

export default function TransactionsLoading(props) {
  return (
    <Panel className={classNames(styles.transactionsLoading, props.className)}>
      Loading...
    </Panel>
  );
}

TransactionsLoading.propTypes = {
  className: string
};

TransactionsLoading.defaultProps = {
  className: null
};
