import React from 'react';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './LoginButton.scss';

const LoginButton = ({ disabled }) => (
  <div className={styles.loginButton}>
    <PrimaryButton
      type="submit"
      disabled={disabled}
    >
      Login
    </PrimaryButton>
    <span className={styles.register}>
            New to nOS?{' '}
      <Link to="/register">Create an account</Link>
    </span>
  </div>);

LoginButton.propTypes = {
  disabled: bool
};

LoginButton.defaultProps = {
  disabled: false
};

export default LoginButton;
