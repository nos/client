import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string } from 'prop-types';

import styles from './AuthFooter.scss';

const AuthFooter = ({ onClick }) => (
  <div className={styles.authFooter} onClick={onClick}>
    <div className={styles.text}>New to nOS? Create Wallet</div>
  </div>
);

AuthFooter.propTypes = {
  buttonText: string.isRequired,
  disabled: bool
};

AuthFooter.defaultProps = {
  disabled: false
};

export default AuthFooter;
