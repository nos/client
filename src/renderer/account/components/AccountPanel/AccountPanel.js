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
  return (
    <Panel className={classNames(styles.accountPanel, props.className)}>
      <div className={styles.summary}>
        <Breakdown className={styles.breakdown} />
        <AccountAddress className={styles.address} address={props.address} />
      </div>
      <Holdings className={styles.holdings} balances={props.balances} prices={props.prices} />
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
