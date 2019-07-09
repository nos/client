import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';

import Input from 'shared/components/Forms/Input';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import instanceShape from 'shared/shapes/instanceShape';
import simpleDecrypt from 'shared/util/simpleDecrypt';
import Pill from 'shared/components/Pill';

import EncryptedInput from '../EncryptedInput';

import styles from './AccountData.scss';

export default class AccountData extends React.PureComponent {
  static propTypes = {
    className: string,
    wallet: instanceShape,
    encryptedMnemonic: string.isRequired,
    secretWord: string.isRequired,
    mnemonic: string.isRequired,
    passphrase: string.isRequired,
    setMnemonic: func.isRequired,
    setPassphrase: func.isRequired,
    confirm: func.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null,
    wallet: null
  };

  state = {
    hidden: true
  };

  render() {
    const { className, mnemonic, wallet } = this.props;

    return (
      <div className={classNames(styles.accountData, className)}>
        {this.renderPublicView({ wallet })}
        {this.renderEncryptedInput({ mnemonic, wallet })}
      </div>
    );
  }

  renderEncryptedInput = ({ mnemonic, wallet }) => (
    <EncryptedInput
      title={mnemonic ? 'Secret words' : 'Private Key'}
      data={mnemonic || wallet.privateKey}
    />
  );

  renderPublicView = ({ wallet }) => (
    <React.Fragment>
      {wallet && (
        <div className={styles.publicView}>
          <div className={styles.heading}>Public Address</div>
          <Input readOnly className={styles.input} type="text" value={wallet.address} />
        </div>
      )}
    </React.Fragment>
  );

  handleToggleHidden = () => {
    const prevState = this.state.hidden;
    this.setState({ hidden: !prevState });
  };

  handleToggleMnemonic = () => {
    const prevState = this.state.hidden;
    const { secretWord, confirm, setPassphrase, setMnemonic, encryptedMnemonic } = this.props;

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
      setMnemonic(encryptedMnemonic);
    }
  };

  handleShowHiddenConfirm = async () => {
    const prevState = this.state.hidden;
    const { mnemonic, showErrorToast, setMnemonic, setPassphrase, passphrase } = this.props;

    try {
      const decryptedMnemonic = await simpleDecrypt(mnemonic, passphrase);
      setMnemonic(decryptedMnemonic);
      setPassphrase('');
      this.setState({ hidden: !prevState });
    } catch (e) {
      showErrorToast('Wrong passphrase, unable to show Secret Words.');
    }
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };
}
