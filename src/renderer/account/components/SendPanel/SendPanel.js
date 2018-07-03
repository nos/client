import React from 'react';
import { func, string, bool, arrayOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';
import { BigNumber } from 'bignumber.js';
import { noop, mapValues, keyBy } from 'lodash';

import Panel from 'shared/components/Panel';
import Button from 'shared/components/Forms/Button';
import Input from 'shared/components/Forms/Input';
import Icon from 'shared/components/Icon';
import Select from 'shared/components/Forms/Select';
import { NEO } from 'shared/values/assets';

import styles from './SendPanel.scss';
import isNumeric from '../../util/isNumeric';
import balanceShape from '../../shapes/balanceShape';

const balancesShape = arrayOf(balanceShape);

export default class AccountTxPanel extends React.Component {
  static propTypes = {
    loading: bool.isRequired,
    confirm: func.isRequired,
    step: string.isRequired,
    asset: string.isRequired,
    amount: string,
    address: string,
    wif: string,
    net: string,
    receiver: string,
    setAmount: func,
    setReceiver: func,
    setStep: func,
    setAsset: func,
    doTransfer: func,
    balances: balancesShape.isRequired
  };

  static defaultProps = {
    amount: '',
    receiver: '',
    net: '',
    address: '',
    wif: '',
    setAmount: noop,
    setReceiver: noop,
    setAsset: noop,
    setStep: noop,
    doTransfer: noop
  };

  render() {
    const { loading, amount, receiver, asset, step } = this.props;
    const assets = this.getAssets();
    const symbol = assets[asset];

    return (
      <Panel className={styles.sendPanel} renderHeader={null}>
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
              <Icon className={styles.icon} name="transfer" aria-describedby="transfer" />
              Transfer
            </Button>
          </div>
        </form>
      </Panel>
    );
  }

  renderAssets = () => {
    const { balances } = this.props;

    if (balances.length === 0) {
      return <option key={NEO} value={NEO}>NEO</option>;
    }

    return balances.map(({ symbol, scriptHash }) => (
      <option key={scriptHash} value={scriptHash}>{symbol}</option>
    ));
  }

  handleTransfer = () => {
    const { confirm, receiver, asset } = this.props;
    const assets = this.getAssets();

    confirm(`Would you like to transfer ${this.getAmount()} ${assets[asset]} to ${receiver}?`, {
      title: 'Confirm fund transfer',
      onConfirm: this.handleConfirm,
      onCancel: noop
    });
  }

  handleConfirm = () => {
    const { doTransfer, net, asset, receiver, address, wif } = this.props;

    doTransfer({ net, asset, amount: this.getAmount(), receiver, address, wif });
  };

  handleChangeAsset = (event) => {
    const { value } = event.target;
    const { setAsset, setStep } = this.props;

    setAsset(event.target.value);
    setStep(value === NEO ? '1' : '0.00000001');
  };

  handleChangeAmount = (event) => {
    this.props.setAmount(event.target.value);
  };

  handleChangeRecipient = (event) => {
    this.props.setReceiver(event.target.value);
  };

  getAssets = () => {
    const { balances } = this.props;
    return mapValues(keyBy(balances, 'scriptHash'), 'symbol');
  }

  getAmount = () => {
    const { asset, amount } = this.props;
    return new BigNumber(amount).toFixed(asset === NEO ? 0 : 8);
  };

  isValid = () => {
    return isNumeric(this.props.amount) && wallet.isAddress(this.props.receiver);
  };
}
