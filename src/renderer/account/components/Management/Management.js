import React from 'react';
import { string, number, func, objectOf } from 'prop-types';
import { map } from 'lodash';
import classnames from 'classnames';

import Page from 'shared/components/Page';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Pill from 'shared/components/Pill';
import COINS from 'shared/values/coins';
import accountShape from 'auth/shapes/accountShape';
import walletShape from 'auth/shapes/walletShape';

import Wallets from './Wallets';
import Account from './Account';

import styles from './Management.scss';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    account: accountShape.isRequired,
    confirm: func.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    coinType: number.isRequired,
    setCoinType: func.isRequired,
    addAccount: func.isRequired,
    wallets: objectOf(walletShape)
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  render() {
    const { className, wallets, account, account: { encryptedMnemonic, secretWord } } = this.props;

    return (
      <Page className={classnames(className, styles.management)}>
        { !account.isHardware && (
          <React.Fragment>
            {this.renderHeading({ account })}
            <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
          </React.Fragment>
        )}
        {wallets && (
          <Wallets
            encryptedMnemonic={encryptedMnemonic}
            secretWord={secretWord}
            wallets={wallets}
          />
        )}
      </Page>
    );
  }

  renderHeading = () => (
    <div className={styles.heading}>
      <div className={styles.title}>My Account</div>
      <div className={styles.link} role="button" tabIndex={0} onClick={this.handleAddAccount}>
          New Address
      </div>
    </div>
  )

  handleAddAccount = () => {
    const {
      confirm,
      coinType,
      setPassphrase,
      account: { secretWord }
    } = this.props;

    confirm(
      <form>
        <Pill className={styles.pill}>{secretWord}</Pill>
        <LabeledInput
          id="passphrase"
          type="password"
          label="Enter Passphrase"
          placeholder="Passphrase"
          onChange={this.handleChangePassphrase}
        />
        <LabeledSelect
          className={styles.input}
          labelClass={styles.label}
          id="network"
          label="Current Network"
          value={coinType}
          items={this.getCoinTypes()}
          onChange={this.handleChangeCoinType}
        />
      </form>,
      {
        title: 'Add a New Account',
        onConfirm: this.handleAddAccountConfirm,
        onCancel: () => setPassphrase('')
      }
    );
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeCoinType = (coinId) => {
    this.props.setCoinType(coinId);
  };

  handleAddAccountConfirm = () => {
    const { account, passphrase, setPassphrase, coinType, addAccount } = this.props;

    addAccount({ account, passphrase, coinType });
    setPassphrase('');
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };
}
