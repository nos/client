import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import Pill from 'shared/components/Pill';
import Wallet from 'auth/util/Wallet';

import styles from './EncryptedInput.scss';

// TODO props
export default class EncryptedInput extends React.PureComponent {
  static propTypes = {
    className: string,
    data: string.isRequired,
    title: string.isRequired,
    secretWord: string.isRequired,
    passphrase: string.isRequired,
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
      if (wallet) {
        const walletInstance = Wallet({ encryptedMnemonic: data, passphrase, wallet });
        setData(walletInstance.privateKey);
      } else {
        const decryptedData = await simpleDecrypt(data, passphrase);
        setData(decryptedData);
      }

      setPassphrase('');
      this.setState({ hidden: !prevState });
    } catch (e) {
      showErrorToast('Wrong passphrase, unable to show secrets.');
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
