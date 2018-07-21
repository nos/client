import React from 'react';
import classNames from 'classnames';
import { func, string, bool, objectOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';
import { BigNumber } from 'bignumber.js';
import { map, noop } from 'lodash';

import Panel from 'shared/components/Panel';
import Button from 'shared/components/Forms/Button';
import Input from 'shared/components/Forms/Input';
import Icon from 'shared/components/Icon';
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
    setStep: func,
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
    setStep: noop,
    onSend: noop
  };

  render() {
    const { className, loading, amount, receiver, asset, step } = this.props;
    const symbol = this.getSymbol();

    return (
      <Panel className={classNames(styles.sendPanel, className)}>
        <form className={styles.content}>
          <h2>Transfer Funds</h2>
          <div className={styles.inputs}>
            <Input
              className={styles.amount}
              id="amount"
              type="number"
              label="Amount"
              placeholder={`Enter ${symbol} Amount`}
              min="0"
              step={step}
              value={amount}
              onChange={this.handleChangeAmount}
            />
            <Select
              className={styles.asset}
              id="asset"
              value={asset}
              onChange={this.handleChangeAsset}
            >
              {this.renderAssets()}
            </Select>
            <Input
              className={styles.recipient}
              id="recipient"
              type="text"
              label="Recipient"
              placeholder="Enter NEO Address"
              value={receiver}
              disabled={false}
              onChange={this.handleChangeRecipient}
            />
          </div>
          <hr />
          <div className={styles.actions}>
            <Button
              type="submit"
              disabled={loading || !this.isValid()}
              onClick={this.handleTransfer}
            >
              <Icon className={styles.icon} name="transfer" />
              Transfer
            </Button>
          </div>
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
    const { value } = event.target;
    const { setAsset, setStep } = this.props;
    const { decimals } = this.getAsset(value);

    setAsset(value);
    setStep(new BigNumber(10).pow(-decimals).toFixed(decimals));
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
