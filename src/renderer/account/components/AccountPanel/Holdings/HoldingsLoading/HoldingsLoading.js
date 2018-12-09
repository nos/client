import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { times } from 'lodash';

import styles from './HoldingsLoading.scss';

export default class HoldingsLoading extends React.PureComponent {
  static propTypes = {
    className: string
  }

  static defaultProps = {
    className: null
  }

  render() {
    return (
      <div className={classNames(styles.holdingsLoading, this.props.className)}>
        {times(5, this.renderHolding)}
      </div>
    );
  }

  renderHolding = (index) => {
    return (
      <div key={index} className={styles.holding}>
        <div className={styles.icon} />
        <div className={styles.meta}>
          <div className={styles.token} />
          <div className={styles.price} />
        </div>
        <div className={styles.balance} />
      </div>
    );
  }
}
