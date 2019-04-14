import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

// import LedgerView from './LedgerView';
import MnemonicView from './MnemonicView';

import styles from './AccountView.scss';
import RegisterForm from '../CreateAccount/RegisterForm/RegisterForm';

export default class AccountView extends React.PureComponent {
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

    const sidePanelText = account.isLedger
      ? 'Connect your ledger and launch the NEO app. This will enable you to select an address for wallet.'
      : '✍ Write down your recovery seed and store it in a safe place. Your recovery seed grants access to all your crypto-currency private keys, so keep it secure!';

    return (
      <AuthPanel
        sidePanel
        step="2"
        onCancel={onCancel}
        className={styles.register}
        sidePanelText={sidePanelText}
      >
        {this.renderComponent()}
        <NavigationButtons onPrevious={reset} onNext={this.goNext} buttonText="Verify" />
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
