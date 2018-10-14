import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Transaction.scss';

export default class TokenItem extends React.Component {
  static propTypes = {
    className: string
  };

  static defaultProps = {
    className: null
  };

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(styles.transaction, className)}>
        <div className={styles.label}> IN </div>
        <div className={styles.type}> Invocation </div>
        <div className={styles.asset}> 3000 ONT </div>
        <span className={styles.transactionId} onClick={this.handleClick}>
          joefjseoifhseiodajwdiphawdohowaifhaowifhoawfhwa
        </span>
      </div>
    );
  }

  handleClick = () => {
    // this.props.onOpen('www.google.be');
  }
}
