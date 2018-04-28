import React from 'react';
import { map, noop } from 'lodash';
import classNames from 'classnames';
import { func, number, string } from 'prop-types';

import Panel from '../../Panel';
import styles from './AccountTxPanel.scss';
import Button from '../../Forms/Button/Button';
import Input from '../../Forms/Input/Input';
import Icon from '../../Icon/Icon';
import Select from '../../Forms/Select/Select';
import { assetsForSelect, NEO, GAS } from '../../../values/assets';

export default class AccountTxPanel extends React.Component {
  static propTypes = {
    step: string.isRequired,
    asset: string.isRequired,
    amount: number,
    address: string,
    wif: string,
    net: string,
    progress: string,
    receiver: string,
    setAmount: func,
    setReceiver: func,
    doTransfer: func,
    setStep: func,
    setAsset: func
  };

  static defaultProps = {
    amount: 0,
    receiver: '',
    net: '',
    address: '',
    wif: '',
    progress: '',
    setAmount: noop,
    setReceiver: noop,
    setAsset: noop,
    setStep: noop,
    doTransfer: noop
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress === 'FAILED') {
      alert('Failed..'); // eslint-disable-line
    }
  }

  render() {
    const { amount, receiver, asset, step } = this.props;

    return (
      <Panel className={styles.accountPanel} renderHeader={null}>
        <form className={styles.content}>
          <h2>Transfer Funds</h2>
          <div className={styles.inputWrapper}>
            <Input
              className={styles.inputs}
              id="amount"
              type="number"
              label="Select Amount"
              placeholder="0"
              min="0"
              step={step}
              value={amount}
              disabled={false}
              onChange={this.handleChangeAmount}
            />
            <Select className={styles.inputSelect} value={asset} onChange={this.handleSelect}>
              {map(assetsForSelect, (item, index) => (
                <option value={item.value} key={`asset${index}`}>{item.label}</option>
              ))}
            </Select>
            <Input
              className={styles.inputs}
              id="recipient"
              type="text"
              label="Transfer to"
              placeholder="AFnWixEza..."
              value={receiver}
              disabled={false}
              onChange={this.handleChangeReceiver}
            />
          </div>
          <hr />
          <div className={styles.buttonWrapper}>
            <Button
              className={classNames(styles.buttons, styles.buttonSecondary)}
              type="submit"
              onClick={this.handleTransfer}
            >
              <Icon className={styles.Icons} name="add" aria-describedby="add" />
              Add Account
            </Button>
            <Button className={styles.buttons} type="submit" onClick={this.handleTransfer}>
              <Icon className={styles.Icons} name="transfer" aria-describedby="transfer" />
              Transfer
            </Button>
          </div>
        </form>
      </Panel>
    );
  }

  handleTransfer = () => {
    const { doTransfer } = this.props;
    const { net, asset, amount, receiver, address, wif } = this.props;

    try {
      doTransfer(net, asset, amount, receiver, address, wif);
      return null;
    } catch (e) {
      return null;
    }
  };

  handleSelect = (event) => {
    const { value } = event.target;

    if (value === NEO) {
      this.props.setStep('1');
    }
    if (value === GAS) {
      this.props.setStep('0.00000001');
    }

    this.props.setAsset(event.target.value);
  };

  handleChangeAmount = (event) => {
    const { value } = event.target;
    const finalValue = this.props.asset === NEO ?
      Number(value).toFixed(0) :
      Number(value).toFixed(8);
    this.props.setAmount(finalValue);
  };

  handleChangeReceiver = (event) => {
    this.props.setReceiver(event.target.value);
  };
}
