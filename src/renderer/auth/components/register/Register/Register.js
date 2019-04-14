import React from 'react';

import accountShape from 'auth/shapes/accountShape';

import CreateAccount from '../CreateAccount';
import AccountView from '../AccountView';

import styles from './Register.scss';
import VerifyAccount from '../VerifyAccount';

export default class Register extends React.PureComponent {
  static propTypes = {
    account: accountShape
  };

  static defaultProps = {
    account: null
  };

  state = {
    step: 2
  };

  render() {
    const { onCancel, redirect, account } = this.props;

    return <React.Fragment>{this.renderComponent()}</React.Fragment>;
  }

  renderComponent = () => {
    const { account } = this.props;
    const { step } = this.state;

    if (account && step === 3) {
      return this.renderThirdStep();
    } else if (account && step === 2) {
      return this.renderSecondStep();
    } else {
      return this.renderFirstStep();
    }
  };

  renderFirstStep = () => {
    return <CreateAccount />;
  };

  renderSecondStep = () => {
    const { account } = this.props;
    return <AccountView account={account} reset={this.props.reset} setStep={this.setStep} />;
  };

  renderThirdStep = () => {
    const { account } = this.props;
    return <VerifyAccount account={account} />;
  };

  setStep = (step) => {
    console.log('Setting Step ', step);
    this.setState({ step });
  };
}
