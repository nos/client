import React from 'react';
import { bool, string } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './AuthButton.scss';

const AuthButton = ({ buttonText, disabled }) => (
  <div className={styles.authButton}>
    <PrimaryButton type="submit" disabled={disabled}>
      {buttonText}
    </PrimaryButton>
  </div>
);

AuthButton.propTypes = {
  buttonText: string.isRequired,
  disabled: bool
};

AuthButton.defaultProps = {
  disabled: false
};

export default AuthButton;
