import React from 'react';
import classNames from 'classnames';
import { func, string, bool, objectOf } from 'prop-types';
import { wallet } from '@cityofzion/neon-js';
import { BigNumber } from 'bignumber.js';
import { map, noop } from 'lodash';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';

import TokenItem from './TokenItem';
import isNumeric from '../../../util/isNumeric';
import balanceShape from '../../../shapes/balanceShape';
import styles from './Send.scss';

export default class Send extends React.PureComponent {
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
      <form className={classNames(styles.send, className)}>
        <LabeledSelect
          id="asset"
          label="Token to send"
          placeholder="Select token"
          value={asset}
          items={this.getAssetItems()}
          renderItem={TokenItem}
          onChange={this.handleChangeAsset}
        />
        <LabeledInput
          id="amount"
          type="number"
          label="Sending amount"
          placeholder={`Enter ${symbol} amount`}
          min="0"
          step={step}
          value={amount}
          onChange={this.handleChangeAmount}
        />
        <LabeledInput
          id="recipient"
          label="Recipient"
          placeholder="Wallet address"
          value={receiver}
          onChange={this.handleChangeRecipient}
        />
        <PrimaryButton
          className={styles.next}
          type="submit"
          disabled={loading || !this.isValid()}
          onClick={this.handleTransfer}
        >
          Next
        </PrimaryButton>
      </form>
    );
  }

  handleTransfer = () => {
    const { confirm, receiver } = this.props;
    const symbol = this.getSymbol();

    confirm((
      <span>
        Would you like to transfer {this.getAmount()} {symbol} to address{' '}
        <strong>&ldquo;{receiver}&rdquo;</strong>?
      </span>
    ), {
      title: 'Transfer',
      onConfirm: this.handleConfirm,
      onCancel: noop
    });
  }

  handleConfirm = () => {
    const { onSend, asset, receiver } = this.props;
    const amount = this.getAmount();

    onSend({ asset, amount, receiver });
  };

  handleChangeAsset = (value) => {
    this.props.setAsset(value);
  };

  handleChangeAmount = (event) => {
    this.props.setAmount(event.target.value);
  };

  handleChangeRecipient = (event) => {
    this.props.setReceiver(event.target.value);
  };

  getAssetItems = () => {
    return map(this.props.balances, ({ symbol, scriptHash, image }) => ({
      label: symbol,
      value: scriptHash,
      icon: image
    }));
  }

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
