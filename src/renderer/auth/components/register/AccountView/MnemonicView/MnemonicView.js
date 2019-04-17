import React from 'react';
import { func } from 'prop-types';

import accountShape from 'auth/shapes/accountShape';
import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'auth/components/Register/NavigationButtons';

import MnemonicWord from './MnemonicWord';
import styles from './MnemonicView.scss';

export default class MnemonicView extends React.PureComponent {
  static propTypes = {
    account: accountShape.isRequired,
    setStep: func.isRequired,
    onCancel: func.isRequired,
    onBack: func.isRequired
  };

  render() {
    const { onCancel, account, onBack } = this.props;

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
              <MnemonicWord
                key={`${word + count + 1}`}
                count={count + 1}
                word={word}
              />
            ))}
        </div>
        <NavigationButtons
          onBack={onBack}
          onNext={this.onNext}
          nextBtnText="Next: Verify"
        />
      </AuthPanel>
    );
  }

  onNext = () => {
    this.props.setStep(3);
  };
}
