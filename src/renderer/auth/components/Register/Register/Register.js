import React from 'react';
import { func, bool } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';

import CreateAccount from '../CreateAccount';
import AccountView from '../AccountView';

import VerifyAccount from '../VerifyAccount';

export default class Register extends React.PureComponent {
  static propTypes = {
    account: accountShape,
    redirect: func.isRequired,
    onCancel: func.isRequired,
    reset: func.isRequired,
    loading: bool.isRequired
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
    const { account, onCancel, reset, loading } = this.props;
    return (
      <AccountView
        loading={loading}
        account={account}
        onCancel={onCancel}
        setStep={this.setStep}
        onBack={reset}
      />
    );
  };

  renderThirdStep = () => {
    const { account, onCancel, loading } = this.props;
    return (
      <VerifyAccount
        loading={loading}
        account={account}
        onCancel={onCancel}
        setStep={this.setStep}
      />
    );
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  previousStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  setStep = (step) => {
    this.setState({
      step
    });
  };
}
