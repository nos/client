import React from 'react';
import classNames from 'classnames';
import { func, string, bool, objectOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';
import { BigNumber } from 'bignumber.js';
import { map, noop } from 'lodash';

import Panel from 'shared/components/Panel';
import Button from 'shared/components/Forms/Button';
import Input from 'shared/components/Forms/Input';
import Select from 'shared/components/Forms/Select';

import styles from './SendPanel.scss';
import isNumeric from '../../util/isNumeric';
import balanceShape from '../../shapes/balanceShape';

export default class AccountTxPanel extends React.Component {
  static propTypes = {
    className: string,
    loading: bool.isRequired,
    confirm: func.isRequired,
    step: string.isRequired,
    asset: string.isRequired,
    amount: string,
    receiver: string,
    setAmount: func,
    setReceiver: func,
    setAsset: func,
    onSend: func,
    balances: objectOf(balanceShape).isRequired
  };

  static defaultProps = {
    className: null,
    amount: '',
    receiver: '',
    setAmount: noop,
    setReceiver: noop,
    setAsset: noop,
    onSend: noop
  };

  render() {
    const { className, loading, amount, receiver, asset, step } = this.props;
    const symbol = this.getSymbol();

    return (
      <Panel className={classNames(styles.sendPanel, className)}>
        <form className={styles.content}>
          <h2>Send</h2>
          <Select
            className={styles.asset}
            id="asset"
            label="Token to send"
            value={asset}
            onChange={this.handleChangeAsset}
          >
            {this.renderAssets()}
          </Select>
          <Input
            className={styles.amount}
            id="amount"
            type="number"
            label="Sending amount"
            placeholder={`Enter ${symbol} amount`}
            min="0"
            step={step}
            value={amount}
            onChange={this.handleChangeAmount}
          />
          <Input
            className={styles.recipient}
            id="recipient"
            type="text"
            label="Recipient"
            placeholder="Wallet address"
            value={receiver}
            disabled={false}
            onChange={this.handleChangeRecipient}
          />
          <Button
            type="submit"
            disabled={loading || !this.isValid()}
            onClick={this.handleTransfer}
          >
            Next
          </Button>
        </form>
      </Panel>
    );
  }

  renderAssets = () => {
    return map(this.props.balances, ({ symbol, scriptHash }) => (
      <option key={scriptHash} value={scriptHash}>{symbol}</option>
    ));
  }

  handleTransfer = () => {
    const { confirm, receiver } = this.props;
    const symbol = this.getSymbol();

    confirm(`Would you like to transfer ${this.getAmount()} ${symbol} to ${receiver}?`, {
      title: 'Confirm fund transfer',
      onConfirm: this.handleConfirm,
      onCancel: noop
    });
  }

  handleConfirm = () => {
    const { onSend, asset, receiver } = this.props;
    const amount = this.getAmount();

    onSend({ asset, amount, receiver });
  };

  handleChangeAsset = (event) => {
    this.props.setAsset(event.target.value);
  };

  handleChangeAmount = (event) => {
    this.props.setAmount(event.target.value);
  };

  handleChangeRecipient = (event) => {
    this.props.setReceiver(event.target.value);
  };

  getSymbol = () => {
    return this.getAsset(this.props.asset).symbol;
  }

  getAmount = () => {
    const { asset, amount } = this.props;
    return new BigNumber(amount).toFixed(this.getAsset(asset).decimals);
  };

  getAsset = (scriptHash) => {
    return this.props.balances[scriptHash];
  }

  isValid = () => {
    return isNumeric(this.props.amount) && wallet.isAddress(this.props.receiver);
  };
}
