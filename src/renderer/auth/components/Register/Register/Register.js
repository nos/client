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
    step: 1
  };

  render() {
    const { step } = this.state;

    switch (step) {
      case 1:
        return this.renderFirstStep();
      case 2:
        return this.renderSecondStep();
      case 3:
        return this.renderThirdStep();
      default:
        return this.renderFirstStep();
    }
  }

  renderFirstStep = () => {
    const { redirect, onCancel } = this.props;
    return <CreateAccount redirect={redirect} onCancel={onCancel} nextStep={this.nextStep} />;
  };

  renderSecondStep = () => {
    const { account, onCancel, reset, loading } = this.props;
    return (
      <AccountView
        loading={loading}
        account={account}
        onCancel={onCancel}
        onBack={reset}
        nextStep={this.nextStep}
        previousStep={this.previousStep}
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
        previousStep={this.previousStep}
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
}
