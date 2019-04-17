import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

import LedgerConnect from 'shared/images/auth/ledgerConnect.svg';
import LedgerConnected from 'shared/images/auth/ledgerConnected.svg';
import LedgerComplete from 'shared/images/auth/ledgerComplete.svg';

import styles from './LedgerView.scss';

export default class LedgerView extends React.PureComponent {
  static propTypes = {
    account: accountShape
  };

  static defaultProps = {
    account: null
  };

  render() {
    const { onCancel, onBack, account, reset } = this.props;

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
          onBack={onBack}
          onNext={this.onNext}
          nextBtnText="Next: Verify"
        />
      </AuthPanel>
    );
  }

  renderComponent = () => {
    const { account } = this.props;

    return (
      <div className={styles.ledgerView}>
        <LedgerConnect />
      </div>
    );
  };

  onNext = () => {
    this.props.setStep(3);
  };
}
