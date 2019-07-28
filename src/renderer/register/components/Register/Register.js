import React from 'react';
import { func, number, bool } from 'prop-types';

import CreateAccount from '../CreateAccount';
import AccountView from '../AccountView';

import VerifyAccount from '../VerifyAccount';

export default class Register extends React.PureComponent {
  static propTypes = {
    redirect: func.isRequired,
    onCancel: func.isRequired,
    step: number.isRequired,
    setStep: func.isRequired,
    loading: bool.isRequired
  };

  render() {
    const { step } = this.props;

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
    const { onCancel } = this.props;

    return (
      <AccountView onCancel={onCancel} nextStep={this.nextStep} previousStep={this.previousStep} />
    );
  };

  renderThirdStep = () => {
    const { onCancel, loading } = this.props;
    return <VerifyAccount onCancel={onCancel} previousStep={this.previousStep} loading={loading} />;
  };

  nextStep = () => {
    const { step, setStep } = this.props;
    setStep(step + 1);
  };

  previousStep = () => {
    const { step, setStep } = this.props;
    setStep(step - 1);
  };
}
