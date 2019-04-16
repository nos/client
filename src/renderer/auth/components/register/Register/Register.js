import React from 'react';
import { func } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';

import CreateAccount from '../CreateAccount';
import AccountView from '../AccountView';

import VerifyAccount from '../VerifyAccount';

import styles from './Register.scss';

export default class Register extends React.PureComponent {
  static propTypes = {
    account: accountShape,
    redirect: func.isRequired,
    onCancel: func.isRequired,
    reset: func.isRequired
  };

  static defaultProps = {
    account: null
  };

  state = {
    step: 2
  };

  render() {
    const { account } = this.props;
    const { step } = this.state;

    if (account && step === 3) {
      return this.renderThirdStep();
    } else if (account && step === 2) {
      return this.renderSecondStep();
    } else {
      return this.renderFirstStep();
    }
  }

  renderFirstStep = () => {
    const { redirect, onCancel } = this.props;
    return <CreateAccount redirect={redirect} onCancel={onCancel} />;
  };

  renderSecondStep = () => {
    const { account, onCancel, reset } = this.props;
    return (
      <AccountView account={account} onCancel={onCancel} setStep={this.setStep} onBack={reset} />
    );
  };

  renderThirdStep = () => {
    const { account, onCancel } = this.props;
    return <VerifyAccount account={account} onCancel={onCancel} setStep={this.setStep} />;
  };

  setStep = (step) => {
    this.setState({ step });
  };
}
