import React from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { number, string, func } from 'prop-types';
import { noop } from 'lodash';

import Label from 'shared/components/Forms/Label';
import Input from 'shared/components/Forms/Input';
import TokenIcon from 'shared/components/TokenIcon';
import anyPropsChanged from 'shared/util/anyPropsChanged';
import { SYMBOLS } from 'shared/values/currencies';

import balanceShape from '../../../../shapes/balanceShape';
import styles from './ConversionInput.scss';

export default class ConversionInput extends React.PureComponent {
  static propTypes = {
    className: string,
    asset: balanceShape.isRequired,
    currency: string.isRequired,
    price: number,
    amount: string,
    onChange: func
  }

  static defaultProps = {
    className: null,
    amount: '',
    price: 0,
    onChange: noop
  }

  state = {
    currencyFocus: false,
    currencyValue: ''
  }

  assetInput = React.createRef();

  currencyInput = React.createRef();

  componentDidUpdate(prevProps) {
    if (anyPropsChanged(prevProps, this.props, ['amount', 'price']) && !this.state.currencyFocus) {
      this.updateCurrencyFromAsset();
    }
  }

  render() {
    const { asset, amount, currency, price } = this.props;
    const className = classNames(styles.conversionInput, this.props.className);

    return (
      <Label className={className} label="Sending amount" htmlFor="assetAmount">
        <div className={styles.inputContainer}>
          <Input
            ref={this.assetInput}
            className={styles.assetInput}
            id="assetAmount"
            type="number"
            placeholder={`Enter ${asset.symbol} amount`}
            min="0"
            max={asset.balance}
            step={this.getStep()}
            value={amount}
            renderBefore={this.renderAssetIcon}
            onChange={this.handleChangeAsset}
          />
          <Input
            ref={this.currencyInput}
            className={styles.currencyInput}
            id="currencyAmount"
            type="number"
            placeholder={`Enter ${currency} amount`}
            min="0"
            step="1"
            disabled={!price}
            value={this.state.currencyValue}
            renderBefore={this.renderCurrencyIcon}
            onChange={this.handleChangeCurrency}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </div>
      </Label>
    );
  }

  renderAssetIcon = () => {
    return (
      <div className={styles.icon}>
        <TokenIcon className={styles.tokenIcon} {...this.props.asset} />
      </div>
    );
  }

  renderCurrencyIcon = () => {
    return (
      <div className={styles.icon}>
        {SYMBOLS[this.props.currency]}
      </div>
    );
  }

  handleChangeAsset = (event) => {
    this.updateCurrencyFromAsset(event.target.value);
  }

  handleChangeCurrency = (event) => {
    this.updateAssetFromCurrency(event.target.value);
  }

  handleFocus = () => {
    this.setState({ currencyFocus: true });
  }

  handleBlur = () => {
    this.setState({ currencyFocus: false }, () => {
      this.updateCurrencyFromAsset();
    });
  }

  getStep = () => {
    const { decimals } = this.props.asset;
    return new BigNumber(10).pow(-decimals).toFixed(decimals);
  }

  updateCurrencyFromAsset = (inputValue = this.assetInput.current.value) => {
    const currencyValue = parseFloat(inputValue, 10) * this.props.price;

    this.setState({ currencyValue: currencyValue.toFixed(2) }, () => {
      this.props.onChange(inputValue);
    });
  }

  updateAssetFromCurrency = (inputValue = this.currencyInput.current.value) => {
    const assetValue = parseFloat(inputValue, 10) / this.props.price;

    this.setState({ currencyValue: inputValue }, () => {
      this.props.onChange(assetValue.toFixed(this.props.asset.decimals));
    });
  }
}
