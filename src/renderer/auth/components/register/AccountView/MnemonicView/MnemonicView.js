import React from 'react';
import { string, any } from 'prop-types';
import { times } from 'lodash';

import AuthPanel from 'auth/components/AuthPanel';

import MnemonicWord from './MnemonicWord';
import NavigationButtons from '../../NavigationButtons';

import styles from './MnemonicView.scss';

const MnemonicView = ({ account, onCancel, reset }) => (
  <AuthPanel
    sidePanel
    step="2"
    onCancel={onCancel}
    className={styles.register}
    sidePanelText="✍ Write down your recovery seed and store it in a safe place. Your recovery seed grants access to all your crypto-currency private keys, so keep it secure!"
  >
    <div className={styles.mnemonicView}>
      {account.mnemonic
        .trim()
        .split(' ')
        .map((word, count) => (
          <MnemonicWord count={count + 1} word={word} />
        ))}
    </div>
    <NavigationButtons
      onPrevious={reset}
      onNext={this.goNext}
      buttonText="Next: Verify"
    />
  </AuthPanel>
);

MnemonicView.propTypes = {
  account: any
};

MnemonicView.defaultProps = {};

export default MnemonicView;






import React from 'react';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';
import styles from './MnemonicView.scss';
import RegisterForm from '../CreateAccount/RegisterForm/RegisterForm';

export default class MnemonicView extends React.PureComponent {
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
      sidePanelText="✍ Write down your recovery seed and store it in a safe place. Your recovery seed grants access to all your crypto-currency private keys, so keep it secure!"
    >
      <div className={styles.mnemonicView}>
        {account.mnemonic
          .trim()
          .split(' ')
          .map((word, count) => (
            <MnemonicWord count={count + 1} word={word} />
          ))}
      </div>
      <NavigationButtons
        onPrevious={reset}
        onNext={this.goNext}
        buttonText="Next: Verify"
      />
    </AuthPanel>
    )
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
