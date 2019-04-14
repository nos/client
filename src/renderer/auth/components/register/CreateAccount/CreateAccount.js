import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';

import RegisterForm from './RegisterForm';

import styles from './CreateAccount.scss';

export default class CreateAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape
  };

  static defaultProps = {
    account: null
  };

  state = {
    currentStep: 1
  };

  render() {
    const { onCancel, redirect, account, setStep } = this.props;
    const { currentStep } = this.state;
    const sidePanelText =
      '🔗 Create a wallet to interact with decentralized apps and transfer crypto-currencies.';

    return (
      <AuthPanel
        sidePanel
        footer={!account ? true : undefined}
        step="1"
        onCancel={onCancel}
        className={styles.register}
        footerText="New to nOS? Create Account"
        sidePanelText={sidePanelText}
      >
        <RegisterForm setStep={setStep} />
      </AuthPanel>
    );
  }
}
