import React from 'react';
import { func, string } from 'prop-types';

import Page from 'shared/components/Page';
import blockShape from 'shared/shapes/blockShape';

import AccountPanel from './AccountPanel';
import TransactionsPanel from './TransactionsPanel';
import styles from './Portfolio.scss';

export default class Portfolio extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.block.index < this.props.block.index) {
      this.props.balancesWithPrices({
        currency: this.props.currency,
        net: this.props.net,
        address: this.props.address
      });
    }
  }

  render() {
    return (
      <div className={styles.account}>
        <Page className={styles.content}>
          <AccountPanel className={styles.panel} />
          <TransactionsPanel className={styles.panel} />
        </Page>
      </div>
    );
  }
}

Portfolio.propTypes = {
  block: blockShape.isRequired,
  balancesWithPrices: func.isRequired,
  currency: string.isRequired,
  net: string.isRequired,
  address: string.isRequired
};

Portfolio.defaultProps = {};
