import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import LabeledInput from 'shared/components/Forms/LabeledInput';

import styles from './VerifyAccount.scss';
import RegisterForm from '../CreateAccount/RegisterForm/RegisterForm';

export default class VerifyAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape
  };

  static defaultProps = {
    account: null
  };

  render() {
    const { onCancel, account, reset } = this.props;

    console.log(account);

    return (
      <AuthPanel
        sidePanel
        step="3"
        onCancel={onCancel}
        sidePanelText="🤓 Let’s make sure that you remember your passwords and stored your recovery seed."
      >
        {this.renderComponent()}
        <NavigationButtons
          onPrevious={this.goPrevious}
          onNext={this.complete}
          buttonText="Complete"
        />
      </AuthPanel>
    );
  }

  goPrevious = () => {
    this.props.setStep(2);
  };

  complete = () => {
    this.props.verifyAndLogin();
  };

  renderComponent = () => {
    const { disabled } = this.props;

    return (
      <div className={styles.verifyAccount}>
        <LabeledInput
          id="verifyPassphrase"
          type="text"
          label="Verify Passphrase"
          placeholder="Enter your passphrase"
          value=""
          disabled={disabled}
        />
        <LabeledInput
          className={styles.input}
          id="verifySecretWord"
          type="text"
          label="Verify Secret Word"
          placeholder="Verify your secret word"
          value=""
          disabled={disabled}
        />
        <LabeledInput
          id="verifyAddress"
          type="text"
          label="Verify Your Addres"
          placeholder="ADJWIODJdjiaojwdOAIJDAWO"
          value=""
          disabled={disabled}
        />

        <div className={styles.mnemonicVerify}>
          <span className={styles.title} role="img" aria-label="title">
            ✍️ Verify your recovery seed from the last step
          </span>
          <div className={styles.horizontal}>
            <LabeledInput
              id="firstRandomSecretWord"
              type="text"
              label="Type word #3"
              placeholder="Secret word.."
              value=""
              disabled={disabled}
            />
            <LabeledInput
              id="secondRandomSecretWord"
              type="text"
              label="Type word #17"
              placeholder="Secret word.."
              value=""
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  };

  renderPrevious = () => {
    console.log('dojawijdoaiwjdaow');
    return <RegisterForm />;
  };
}
