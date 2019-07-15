import React from 'react';
import classNames from 'classnames';
import { string, func, bool } from 'prop-types';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import Pill from 'shared/components/Pill';
import Wallet from 'auth/util/Wallet';
import walletShape from 'auth/shapes/walletShape';

import styles from './EncryptedInput.scss';

export default class EncryptedInput extends React.PureComponent {
  static propTypes = {
    className: string,
    title: string.isRequired,
    data: string.isRequired,
    hidden: bool.isRequired,
    setHidden: func.isRequired,
    setData: func.isRequired,
    secretWord: string.isRequired,
    passphrase: string.isRequired,
    setPassphrase: func.isRequired,
    confirm: func.isRequired,
    showErrorToast: func.isRequired,
    encryptedData: string.isRequired,
    wallet: walletShape // optional - either encrypted data or encrypted wallet is passed
  };

  static defaultProps = {
    className: null,
    wallet: null
  };

  render() {
    const { className, hidden, title, data } = this.props;

    return (
      <div className={classNames(styles.encryptedInput, className)}>
        {this.renderTitle({ title })}
        {this.renderInput({ hidden, data })}
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

  renderInput = ({ hidden, data }) => (
    <Input
      readOnly
      className={styles.input}
      type={hidden ? 'password' : 'text'}
      value={data}
    />
  )


  handleShowHiddenConfirm = async () => {
    const {
      hidden,
      setHidden,
      data,
      wallet,
      showErrorToast,
      setData,
      setPassphrase,
      passphrase
    } = this.props;

    try {
      if (wallet) {
        const walletInstance = Wallet({ encryptedMnemonic: data, passphrase, wallet });
        setData(walletInstance.privateKey);
      } else {
        const decryptedData = await simpleDecrypt(data, passphrase);
        setData(decryptedData);
      }

      setPassphrase('');
      setHidden(!hidden);
    } catch (e) {
      showErrorToast('Wrong passphrase, unable to show secrets.');
    }
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  toggleEncrypted = () => {
    const { hidden, setHidden, secretWord, confirm, setPassphrase, setData, encryptedData } = this.props;

    if (hidden) {
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
      setHidden(!hidden);
      setData(encryptedData);
    }
  };
}
