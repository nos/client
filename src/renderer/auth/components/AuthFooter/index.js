import React from 'react';
import { Link } from 'react-router-dom';
import { bool, string } from 'prop-types';

import styles from './AuthFooter.scss';

const AuthFooter = ({ buttonText, disabled }) => (
  <div className={styles.authFooter}>
    <div className={styles.text}>
      New to nOS? <Link to="/register">Create Wallet</Link>
    </div>
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
