import React from 'react';
import classNames from 'classnames';
import { number, string, arrayOf, objectOf } from 'prop-types';

import Panel from 'shared/components/Panel';

import AccountAddress from './AccountAddress';
import Breakdown from './Breakdown';
import Holdings from './Holdings';
import balanceShape from '../../shapes/balanceShape';
import styles from './AccountPanel.scss';

export default function AccountPanel(props) {
  const { className, address, balances, prices } = props;

  return (
    <Panel className={classNames(styles.accountPanel, className)}>
      <div className={styles.summary}>
        <Breakdown className={styles.breakdown} balances={balances} prices={prices} />
        <AccountAddress className={styles.address} address={address} />
      </div>
      <Holdings className={styles.holdings} balances={balances} prices={prices} />
    </Panel>
  );
}

AccountPanel.propTypes = {
  className: string,
  address: string.isRequired,
  balances: arrayOf(balanceShape).isRequired,
  prices: objectOf(number).isRequired
};

AccountPanel.defaultProps = {
  className: null
};
