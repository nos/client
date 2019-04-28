import React from 'react';
import { bool, func } from 'prop-types';

import AuthPanel from 'auth/components/AuthPanel';

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
      <div className={styles.heading}>
        <div className={styles.pill}>
          <div className={styles.pillText}>
            Secret word: <b>TODO SECRET WORD</b>
          </div>
        </div>
      </div>
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
