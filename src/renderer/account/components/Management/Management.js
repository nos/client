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
import Mnemonic from 'shared/components/NewWallet/Mnemonic';
import Ledger from 'shared/components/NewWallet/Ledger';

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
    publicKey: string.isRequired,
    setPublicKey: func.isRequired,
    wallets: objectOf(walletShape)
  };

  static defaultProps = {
    className: null,
    wallets: {}
  };

  render() {
    const {
      className,
      wallets,
      account,
      account: { encryptedMnemonic, secretWord }
    } = this.props;

    return (
      <Page className={classnames(className, styles.management)}>
        <React.Fragment>
          {this.renderHeading({ account })}
          {!account.isHardware && (
            <Account encryptedMnemonic={encryptedMnemonic} secretWord={secretWord} />
          )}
        </React.Fragment>
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
  );

  handleValues = ({ passphrase, coinType }) => {
    const { setPassphrase, setCoinType } = this.props;
    setPassphrase(passphrase);
    setCoinType(coinType);
  };

  handleAddAccount = () => {
    const { newWallet, coinType, publicKey, confirm, account, setPassphrase } = this.props;

    newWallet(<div />, {
      title: 'Add a New Wallet',
      // onConfirm: this.handleAddAccountConfirm,
      // onCancel: () => setPassphrase(''),
      className: styles.test,
      account
    });
  };

  handleAddAccountConfirm = () => {
    const { publicKey, account, passphrase, coinType, setPassphrase, addAccount } = this.props;

    // TODO move publicKey out of account
    addAccount({ account: { ...account, publicKey }, passphrase, coinType });
    setPassphrase('');
  };

  handleChangePassphrase = (value) => {
    this.props.setPassphrase(value);
  };

  handleChangeCoinType = (coinId) => {
    console.log('SETTING COING TYPE', coinId);
    this.props.setCoinType(coinId);
  };

  handleChangePublicKey = (value) => {
    this.props.setPublicKey(value);
  };

  getCoinTypes = () => {
    return map(COINS, ({ name, coinType }) => ({ label: name, value: coinType }));
  };
}
