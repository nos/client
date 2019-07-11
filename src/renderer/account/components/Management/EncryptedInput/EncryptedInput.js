import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import bip39 from 'bip39';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import instanceShape from 'shared/shapes/instanceShape';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import Pill from 'shared/components/Pill';
import newWalletInstance from 'auth/util/HardwareWallet/HardwareWallet';

import styles from './EncryptedInput.scss';

export default class EncryptedInput extends React.PureComponent {
  static propTypes = {
    className: string,
    data: string.isRequired,
    title: string.isRequired,
    secretWord: string.isRequired,
    mnemonic: string.isRequired,
    passphrase: string.isRequired,
    setMnemonic: func.isRequired,
    setPassphrase: func.isRequired,
    confirm: func.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  state = {
    hidden: true
  };

  render() {
    const { className, title, data, decryptedData } = this.props;

    return (
      <div className={classNames(styles.encryptedInput, className)}>
        {this.renderTitle({ title })}
        {this.renderInput({ data, decryptedData })}
      </div>
    );
  }

  renderTitle = ({ title }) => (
    <div className={styles.heading}>
      <div>{title}</div>
      <div
        className={styles.toggle}
        onClick={this.toggleEncrypted}
        role="button"
        tabIndex={0}
      >
        Show & Unlock
      </div>
    </div>
  );

  renderInput = ({ data, decryptedData }) => (
    <Input
      readOnly
      className={styles.input}
      type={this.state.hidden ? 'password' : 'text'}
      value={decryptedData || data}
    />
  )


  handleShowHiddenConfirm = async () => {
    const prevState = this.state.hidden;
    const { data, wallet, showErrorToast, setData, setPassphrase, passphrase } = this.props;


    try {
      const decryptedData = await simpleDecrypt(data, passphrase);


      if (wallet) {
        const seed = bip39.mnemonicToSeed(decryptedData, passphrase);
        const walletInstance = newWalletInstance(wallet, seed);
        setData(walletInstance.privateKey);
      } else {
        setData(decryptedData);
      }

      setPassphrase('');
      this.setState({ hidden: !prevState });
    } catch (e) {
      showErrorToast('Wrong passphrase, unable to show Secret Words.');
    }
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };


  toggleEncrypted = () => {
    const prevState = this.state.hidden;
    const { secretWord, confirm, setPassphrase, setData, encryptedData } = this.props;

    if (prevState) {
      confirm(
        <div>
          <Pill className={styles.pill}>{secretWord}</Pill>
          <LabeledInput
            id="passphrase"
            type="password"
            label="Enter Passphrase"
            placeholder="Passphrase"
            onChange={this.handleChangePassphrase}
          />
        </div>,
        {
          title: 'Show Secret Words',
          onConfirm: this.handleShowHiddenConfirm,
          onCancel: () => setPassphrase('')
        }
      );
    } else {
      this.setState({ hidden: !prevState });
      setData(encryptedData);
    }
  };
}
