import React from 'react';
import { func } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';

import RegisterForm from './RegisterForm';

import styles from './CreateAccount.scss';

export default class CreateAccount extends React.PureComponent {
  static propTypes = {
    account: accountShape,
    onCancel: func.isRequired,
    redirect: func.isRequired,
    nextStep: func.isRequired
  };

  static defaultProps = {
    account: null
  };

  render() {
    const { onCancel, redirect, account, nextStep } = this.props;

    const sidePanelText =
      '🔗 Create a wallet to interact with decentralized apps and transfer crypto-currencies.';

    return (
      <AuthPanel
        sidePanel
        footer={!account ? true : undefined}
        step="1"
        onCancel={onCancel}
        className={styles.register}
        footerText="Already registered? Log In"
        sidePanelText={sidePanelText}
        redirect={redirect}
      >
        <RegisterForm nextStep={nextStep} />
      </AuthPanel>
    );
  }
}
