import React from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import styles from './PriorityFee.scss';

export default class PriorityFee extends React.Component {
  static propTypes = {
    className: string,
    fee: string,
    editable: bool,
    openSettings: func
  };

  static defaultProps = {
    className: null,
    fee: '0',
    editable: true,
    openSettings: noop
  };

  render() {
    return (
      <div className={classNames(styles.priorityFee, this.props.className)}>
        {this.getFeeDescription()}
        {this.renderChange()}
      </div>
    );
  }

  renderChange = () => {
    if (!this.props.editable) {
      return null;
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={styles.change} href="#" onClick={this.handleChangeFee}>
        Change
      </a>
    );
  };

  handleChangeFee = (event) => {
    event.preventDefault();
    this.props.openSettings();
  };

  getFeeDescription = () => {
    const fee = new BigNumber(this.props.fee);

    if (fee.eq(0)) {
      return 'Not Using GAS Priority Fee';
    } else {
      return `${fee.toFixed(8)} GAS Priority Fee`;
    }
  };
}
