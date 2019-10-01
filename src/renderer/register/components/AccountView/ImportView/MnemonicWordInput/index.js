import classNames from 'classnames';
import { func, string, number } from 'prop-types';
import React from 'react';

import Input from 'shared/components/Forms/Input';
import refShape from 'shared/shapes/refShape';

import mnemonicWordStyles from '../../MnemonicView/MnemonicWord/MnemonicWord.scss';
import styles from './MnemonicWordInput.scss';

const handleInputFocus = (setFocus, value) => (event) => {
  event.preventDefault();
  setFocus(value);
};

const MnemonicWordInput = ({ count, word, inputRef, onChange }) => {
  const [focus, setFocus] = React.useState(false);
  const useFocus = handleInputFocus(setFocus, true);
  const useBlur = handleInputFocus(setFocus, false);

  return (
    <div
      className={classNames(mnemonicWordStyles.mnemonicWord, {
        [styles.focus]: focus
      })}
    >
      <div className={mnemonicWordStyles.count}>{count}</div>
      <Input
        id={`mnemonic-word-${count}`}
        className={classNames(mnemonicWordStyles.word, styles.wordInput)}
        type="text"
        value={word}
        ref={inputRef}
        onFocus={useFocus}
        onBlur={useBlur}
        onChange={onChange}
      />
    </div>
  );
};

MnemonicWordInput.propTypes = {
  count: number.isRequired,
  word: string.isRequired,
  inputRef: refShape.isRequired,
  onChange: func.isRequired
};

MnemonicWordInput.defaultProps = {};

export default MnemonicWordInput;
