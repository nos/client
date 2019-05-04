import React from 'react';
import { bool, func } from 'prop-types';

import AuthPanel from 'auth/components/AuthPanel';
import Pill from 'shared/components/Pill';

import LoginForm from '../LoginForm';
import styles from './Login.scss';

const Login = ({ onCancel, loading, login, redirect }) => (
  <AuthPanel
    footer
    onCancel={onCancel}
    className={styles.login}
    footerText="New to nOS? Create an Account"
    redirect={redirect}
  >
    <div className={styles.content}>
      <div className={styles.title}>Log In</div>
      <Pill>TODO SECRET WORD</Pill>
      <LoginForm disabled={loading} onLogin={login} />
    </div>
  </AuthPanel>
);

Login.propTypes = {
  onCancel: func.isRequired,
  loading: bool.isRequired,
  login: func.isRequired,
  redirect: func.isRequired
};

export default Login;
