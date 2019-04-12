import React from 'react';
import { bool, func, string } from 'prop-types';

import Panel from 'shared/components/Panel';
import CloseIcon from 'shared/images/icons/close-modal.svg';

import LoginFormAccount from '../LoginForm';
import styles from './Login.scss';
import AuthFooter from '../../AuthFooter';

const Login = ({ onCancel, secretWord, loading, login, redirect }) => (
  <Panel className={styles.login}>
    <div className={styles.content}>
      <CloseIcon className={styles.closeIcon} onClick={onCancel} />

      <div className={styles.title}>Log In</div>
      <div className={styles.heading}>
        <div className={styles.pill}>
          <div className={styles.pillText}>
            Secret word: <b>{secretWord}</b>
          </div>
        </div>
      </div>
      <LoginFormAccount disabled={loading} onLogin={login} />
    </div>

    <AuthFooter
      className={styles.footer}
      text="New to nOS? Create Wallet"
      onClick={redirect}
    />
  </Panel>
);

Login.propTypes = {
  onCancel: func.isRequired,
  secretWord: string.isRequired,
  loading: bool.isRequired,
  login: func.isRequired,
  redirect: func.isRequired
};

export default Login;
