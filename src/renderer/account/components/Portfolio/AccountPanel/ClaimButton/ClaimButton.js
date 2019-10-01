import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Button from 'shared/components/Forms/Button';

import styles from './ClaimButton.scss';

export default class ClaimButton extends React.PureComponent {
  static propTypes = {
    className: string,
    loading: bool,
    amount: string.isRequired,
    symbol: string.isRequired,
    onClick: func
  };

  static defaultProps = {
    className: null,
    loading: false,
    onClick: noop
  };

  render() {
    const { className, loading, amount, symbol, onClick } = this.props;

    return (
      <Button
        className={classNames(className, styles.claimButton)}
        disabled={loading}
        onClick={onClick}
      >
        {loading ? 'Claiming GAS...' : `Claim ${amount} ${symbol}`}
      </Button>
    );
  }
}
