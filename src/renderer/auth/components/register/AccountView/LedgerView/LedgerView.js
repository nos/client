import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

import styles from './LedgerView.scss';

export default class LedgerView extends React.PureComponent {
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
    const { onCancel, account, reset } = this.props;

    const sidePanelText =
      'Connect your ledger and launch the NEO app. This will enable you to select an address for wallet.';

    return (
      <AuthPanel
        sidePanel
        step="2"
        onCancel={onCancel}
        className={styles.register}
        sidePanelText={sidePanelText}
      >
        {this.renderComponent()}
        <NavigationButtons
          onPrevious={reset}
          onNext={this.goNext}
          buttonText="Next: Verify"
        />
      </AuthPanel>
    );
  }

  goNext = () => {
    this.props.setStep(3);
  };

  renderComponent = () => {
    const { account } = this.props;

    if (account.isLedger) {
      return null;
      //   return <LedgerView account={account} />;
    } else {
      return <MnemonicView account={account} />;
    }
  };

  renderPrevious = () => {
    console.log('dojawijdoaiwjdaow');
    return <RegisterForm />;
  };
}
