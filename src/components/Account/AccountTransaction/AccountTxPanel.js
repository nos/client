import React from 'react';
import { map, noop } from 'lodash';
import { func, string } from 'prop-types';
import { BigNumber } from 'bignumber.js';

import Panel from '../../Panel';
import styles from './AccountTxPanel.scss';
import Button from '../../Forms/Button/Button';
import Input from '../../Forms/Input/Input';
import Icon from '../../Icon/Icon';
import Select from '../../Forms/Select/Select';
import { assetsForSelect, NEO, GAS, assetsByHash } from '../../../values/assets';

export default class AccountTxPanel extends React.Component {
  static propTypes = {
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
    doTransfer: func
  };

  static defaultProps = {
    amount: 0,
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
    const { amount, receiver, asset, step } = this.props;

    return (
      <Panel className={styles.accountPanel} renderHeader={null}>
        <form className={styles.content}>
          <h2>Transfer Funds</h2>
          <div className={styles.inputWrapper}>
            <Input
              className={styles.smallInputChild}
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
            <Select
              id="asset"
              className={styles.selectChild}
              defaultValue={asset}
              onChange={this.handleSelect}
            >
              {map(assetsForSelect, (item, index) => (
                <option value={item.value} key={`asset${index}`}>{item.label}</option>
              ))}
            </Select>
            <Input
              className={styles.inputChild}
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
            {/* Future feature - ability to save/add accounts to your address book */}
            {/* <Button */}
            {/* className={classNames(styles.buttons, styles.buttonSecondary)} */}
            {/* type="submit" */}
            {/* onClick={this.showTransferConfirm} */}
            {/* > */}
            {/* <Icon className={styles.Icons} name="add" aria-describedby="add"/> */}
            {/* Add Account */}
            {/* </Button> */}
            <Button className={styles.buttons} type="submit" onClick={this.showTransferConfirm}>
              <Icon className={styles.Icons} name="transfer" aria-describedby="transfer" />
              Transfer
            </Button>
          </div>
        </form>
      </Panel>
    );
  }

  handleTransferConfirm = () => {
    const { doTransfer } = this.props;
    const { net, asset, amount, receiver, address, wif } = this.props;

    // TODO error handling
    doTransfer({ net, asset, amount, receiver, address, wif });
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

    // Else new BigNumber() fails
    if (!/^[+-]?([0-9]*[.])?[0-9]+$/.test(value)) return;

    const bnValue = new BigNumber(value);

    const finalValue = this.props.asset === NEO ?
      bnValue.toFixed(0) :
      bnValue.toFixed(8);
    this.props.setAmount(finalValue);
  };

  handleChangeReceiver = (event) => {
    this.props.setReceiver(event.target.value);
  };

  showTransferConfirm = () => {
    const { confirm, amount, receiver, asset } = this.props;
    confirm((
      <div className={styles.prompt}>
        <p>Would you like to transfer {amount} {assetsByHash[asset]} to {receiver}</p>
      </div>
    ), {
      title: 'Confirm fund transfer',
      onConfirm: this.handleTransferConfirm,
      onCancel: noop
    });
  };
}
