import React from 'react';
import { noop } from 'lodash';
import { func, number, string } from 'prop-types';

import Panel from '../../Panel';
import styles from './AccountTxPanel.scss';
import Button from '../../Forms/Button/Button';
import Input from '../../Forms/Input/Input';
import Icon from '../../Icon/Icon';

export default class AccountTxPanel extends React.Component {
  static propTypes = {
    amount: number,
    recipient: string,
    setAmount: func,
    setRecipient: func,
    doTransfer: func
  };

  static defaultProps = {
    amount: '',
    recipient: '',
    setAmount: noop,
    setRecipient: noop,
    doTransfer: noop
  };

  render() {
    const { amount, recipient } = this.props;

    return (
      <Panel className={styles.accountPanel} renderHeader={null}>
        <form className={styles.content}>
          <h2>Transfer Funds</h2>
          <Input
            className={styles.inputs}
            id="amount"
            type="number"
            label="Select Amount"
            placeholder="0"
            value={amount}
            disabled={false}
            onChange={this.handleChangeAmount}
          />
          <Input
            className={styles.inputs}
            id="recipient"
            type="text"
            label="Transfer to"
            placeholder="AFnWixEza..."
            value={recipient}
            disabled={false}
            onChange={this.handleChangeRecipient}
          />
          <hr />
          <Button className={styles.buttons} type="submit" onClick={this.handleTransfer}>
            <Icon className={styles.Icons} name="transfer" aria-describedby="transfer" />
            Transfer
          </Button>
          <Button className={[styles.buttons, styles.buttonSecondary]} type="submit" onClick={this.handleTransfer}>
            <Icon className={styles.Icons} name="add" aria-describedby="add" />
            Add Account
          </Button>
        </form>
      </Panel>
    );
  }

  handleTransfer = () => {
    const { doTransfer } = this.props;

    doTransfer();
  };

  handleChangeAmount = (event) => {
    this.props.setAmount(event.target.value);
  };

  handleChangeRecipient = (event) => {
    this.props.setRecipient(event.target.value);
  };
}
