import * as bip39 from 'bip39';
import { debounce } from 'lodash';
import React from 'react';
import { bool, func, arrayOf, string } from 'prop-types';

import AuthPanel from 'auth/components/AuthPanel';
import NavigationButtons from 'shared/components/NavigationButtons';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import registerShape from 'register/shapes/registerShape';

import MnemonicWordInput from './MnemonicWordInput';
import styles from './ImportView.scss';

export default class ImportView extends React.PureComponent {
  static propTypes = {
    account: registerShape.isRequired,
    loading: bool,
    onCancel: func.isRequired,
    previousStep: func.isRequired,
    storeFormData: func.isRequired,
    showErrorToast: func.isRequired,
    mnemonic: arrayOf(string).isRequired,
    setMnemonic: func.isRequired
  };

  static defaultProps = {
    loading: false
  };

  state = {
    validMnemonic: false
  };

  mnemonicRefs = Array(24)
    .fill(undefined)
    .map(() => React.createRef());

  showErrorToast = debounce((e) => {
    this.props.showErrorToast(e);
  }, 1000);

  render() {
    const { onCancel, loading, mnemonic, previousStep } = this.props;

    return (
      <AuthPanel
        sidePanel
        step="2"
        onCancel={onCancel}
        className={styles.importView}
        sidePanelText="Copy and paste your 24-word seed in the right order into the following form."
      >
        <form onSubmit={this.handleStoreMnemonic}>
          <div className={styles.mnemonic}>
            {mnemonic.map((word, count) => (
              <MnemonicWordInput
                key={`mnemonic-input-word-${count + 1}`}
                count={count + 1}
                word={word}
                inputRef={this.mnemonicRefs[count]}
                onChange={this.setMnemonic(count)}
              />
            ))}
          </div>
          <NavigationButtons
            onBack={previousStep}
            nextBtnText="Next: verify"
            disabled={loading || !this.state.validMnemonic}
            isSubmit
          />
        </form>
      </AuthPanel>
    );
  }

  handleStoreMnemonic = (e) => {
    e.preventDefault();

    const { mnemonic: mnemonicArray, account, storeFormData } = this.props;
    const mnemonic = mnemonicArray.join(' ');

    storeFormData({
      ...account,
      mnemonic
    });
  };

  setMnemonic = (count) => (event) => {
    event.preventDefault();
    const { mnemonic, setMnemonic } = this.props;

    let newMnemonic = event.target.value.trim().split(' ');
    if (newMnemonic.length !== 24) {
      newMnemonic = [...mnemonic];
      newMnemonic[count] = event.target.value;
    }

    const validMnemonic = bip39.validateMnemonic(
      newMnemonic.join(' '),
      bip39.wordlists[DEFAULT_LANGUAGE]
    );

    this.setState({ validMnemonic }, () => {
      setMnemonic(newMnemonic);

      const hasEmptyWords = newMnemonic.filter((x) => x === '');
      if (!this.state.validMnemonic && hasEmptyWords.length === 0)
        this.showErrorToast('Seed is invalid');
    });
  };
}
