import React from 'react';
import { string, number } from 'prop-types';

import styles from './MnemonicWord.scss';

const MnemonicWord = ({ count = 1, word = 'Kek' }) => (
  <div className={styles.mnemonicWord}>
    <div className={styles.count}>{count}</div>
    <div className={styles.word}>{word}</div>
  </div>
);

MnemonicWord.propTypes = {
  count: number.isRequired,
  word: string.isRequired
};

MnemonicWord.defaultProps = {};

export default MnemonicWord;
