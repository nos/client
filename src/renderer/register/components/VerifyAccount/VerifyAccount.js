import React from 'react';
import { func, bool, string, number, oneOfType } from 'prop-types';

import registerShape, { registerLedgerShape } from 'register/shapes/registerShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'shared/components/NavigationButtons';
import LabeledInput from 'shared/components/Forms/LabeledInput';
import { publicKeyToAddress } from 'shared/wallet/common';

import styles from './VerifyAccount.scss';

export default class VerifyAccount extends React.PureComponent {
  static propTypes = {
    account: oneOfType([registerShape, registerLedgerShape]).isRequired,
    completeRegistration: func.isRequired,
    previousStep: func.isRequired,
    loading: bool.isRequired,
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
    setSecondMnemonicWord: func.isRequired,
    setLastLogin: func.isRequired
  };

  render() {
    const { onCancel, loading, previousStep } = this.props;

    return (
      <AuthPanel
        sidePanel
        step="3"
        onCancel={onCancel}
        sidePanelText="🤓 Let’s make sure that you remember your passwords and stored your recovery seed."
      >
        {this.renderComponent()}
        <NavigationButtons
          onBack={previousStep}
          onNext={this.completeRegistration}
          nextBtnText="Complete"
          disabled={loading}
        />
      </AuthPanel>
    );
  }

  renderComponent = () => {
    const {
      account,
      loading,
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
          type="password"
          label="Verify Passphrase"
          placeholder="Enter your passphrase"
          value={passphrase}
          disabled={loading}
          onChange={this.handleChangePassphrase}
        />
        <LabeledInput
          className={styles.input}
          id="verifySecretWord"
          type="text"
          label="Verify Secret Word"
          placeholder="Verify your secret word"
          value={secretWord}
          disabled={loading}
          onChange={this.handleChangeSecretWord}
        />

        {/** TODO - LabeledInput --> DisplayInput & address doesn't exist?? */}
        {account.isHardware && (
          <LabeledInput
            id="verifyAddress"
            type="text"
            label="Verify Your Addres"
            placeholder={publicKeyToAddress(account.publicKey)}
            value=""
            disabled={loading}
          />
        )}

        {!account.isHardware && (
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
                disabled={loading}
                onChange={this.handleChangeFirstMnemonicWord}
              />
              <LabeledInput
                id="secondRandomSecretWord"
                type="text"
                label={`Type word #${secondMnemonicWordIndex}`}
                placeholder="Secret word.."
                value={secondMnemonicWord}
                disabled={loading}
                onChange={this.handleChangeSecondMnemonicWord}
              />
            </div>
          </div>
        )}
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

  completeRegistration = () => {
    const {
      account,
      passphrase,
      secretWord,
      firstMnemonicWord,
      secondMnemonicWord,
      firstMnemonicWordIndex,
      secondMnemonicWordIndex,
      setLastLogin,
      completeRegistration
    } = this.props;

    completeRegistration({
      account,
      passphrase,
      secretWord,
      firstMnemonicWord,
      firstMnemonicWordIndex,
      secondMnemonicWord,
      secondMnemonicWordIndex
    });

    // TODO - move setLastLogin inside registerComplete/verifyAndAuthenticate function
    setLastLogin({ label: account.accountLabel });
  };
}
