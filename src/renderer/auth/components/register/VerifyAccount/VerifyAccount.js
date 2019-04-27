import React from 'react';
import { func, bool, string, number } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import LabeledInput from 'shared/components/Forms/LabeledInput';

import styles from './VerifyAccount.scss';

export default class VerifyAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired,
    verifyAndAuthenticate: func.isRequired,
    setStep: func.isRequired,
    disabled: bool.isRequired,
    onCancel: func.isRequired,
    passphrase: string.isRequired,
    secretWord: string.isRequired,
    firstMnemonicWord: string.isRequired,
    firstMnemonicWordIndex: number.isRequired,
    secondMnemonicWord: string.isRequired,
    secondMnemonicWordIndex: number.isRequired,
    setPassphrase: func.isRequired,
    setSecretWord: func.isRequired,
    setFirstMnemonicWord: func.isRequired,
    setSecondMnemonicWord: func.isRequired
  };

  render() {
    const { onCancel } = this.props;

    return (
      <AuthPanel
        sidePanel
        step="3"
        onCancel={onCancel}
        sidePanelText="🤓 Let’s make sure that you remember your passwords and stored your recovery seed."
      >
        {this.renderComponent()}
        <NavigationButtons
          onBack={this.onBack}
          onNext={this.completeRegistration}
          nextBtnText="Complete"
        />
      </AuthPanel>
    );
  }

  renderComponent = () => {
    const {
      account,
      disabled,
      passphrase,
      secretWord,
      firstMnemonicWord,
      secondMnemonicWord,
      firstMnemonicWordIndex,
      secondMnemonicWordIndex
    } = this.props;

    return (
      <div className={styles.verifyAccount}>
        <LabeledInput
          id="verifyPassphrase"
          type="text"
          label="Verify Passphrase"
          placeholder="Enter your passphrase"
          value={passphrase}
          disabled={disabled}
          onChange={this.handleChangePassphrase}
        />
        <LabeledInput
          className={styles.input}
          id="verifySecretWord"
          type="text"
          label="Verify Secret Word"
          placeholder="Verify your secret word"
          value={secretWord}
          disabled={disabled}
          onChange={this.handleChangeSecretWord}
        />

        {/** TODO - LabeledInput --> DisplayInput & address doesn't exist?? */}
        {account.isLedger && (
          <LabeledInput
            id="verifyAddress"
            type="text"
            label="Verify Your Addres"
            placeholder={account.accounts[account.activeAccountId].address}
            value=""
            disabled={disabled}
          />
        )}

        <div className={styles.mnemonicVerify}>
          <span className={styles.title} role="img" aria-label="title">
            ✍️ Verify your recovery seed from the last step
          </span>
          <div className={styles.horizontal}>
            <LabeledInput
              id="firstRandomSecretWord"
              type="text"
              label={`Type word #${firstMnemonicWordIndex}`}
              placeholder="Secret word.."
              value={firstMnemonicWord}
              disabled={disabled}
              onChange={this.handleChangeFirstMnemonicWord}
            />
            <LabeledInput
              id="secondRandomSecretWord"
              type="text"
              label={`Type word #${secondMnemonicWordIndex}`}
              placeholder="Secret word.."
              value={secondMnemonicWord}
              disabled={disabled}
              onChange={this.handleChangeSecondMnemonicWord}
            />
          </div>
        </div>
      </div>
    );
  };

  handleChangePassphrase = (event) => {
    this.props.setPassphrase(event.target.value);
  };

  handleChangeSecretWord = (event) => {
    this.props.setSecretWord(event.target.value);
  };

  handleChangeFirstMnemonicWord = (event) => {
    this.props.setFirstMnemonicWord(event.target.value);
  };

  handleChangeSecondMnemonicWord = (event) => {
    this.props.setSecondMnemonicWord(event.target.value);
  };

  onBack = () => {
    this.props.setStep(2);
  };

  completeRegistration = () => {
    const {
      account,
      passphrase,
      secretWord,
      firstMnemonicWord,
      secondMnemonicWord,
      firstMnemonicWordIndex,
      secondMnemonicWordIndex,
      storeProfile,
      setLastLogin
    } = this.props;

    // TODO get form values and make it compare
    this.props.verifyAndAuthenticate({
      account,
      passphrase,
      secretWord,
      firstMnemonicWord,
      firstMnemonicWordIndex,
      secondMnemonicWord,
      secondMnemonicWordIndex
    });

    // TODO - move this where?
    storeProfile({ label: account.accountLabel, value: account });
    setLastLogin({ label: account.accountLabel });
  };
}
