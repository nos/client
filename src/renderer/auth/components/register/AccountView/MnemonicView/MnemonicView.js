import React from 'react';
import { string, any } from 'prop-types';
import { times } from 'lodash';

import MnemonicWord from './MnemonicWord';
import NavigationButtons from '../../NavigationButtons';

import styles from './MnemonicView.scss';

const MnemonicView = ({ account }) => (
  <div className={styles.mnemonicView}>
    {account.mnemonic
      .trim()
      .split(' ')
      .map((word, count) => (
        <MnemonicWord count={count + 1} word={word} />
      ))}
  </div>
);

MnemonicView.propTypes = {
  account: any
};

MnemonicView.defaultProps = {};

export default MnemonicView;
