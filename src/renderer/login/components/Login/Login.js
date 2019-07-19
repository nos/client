import React from 'react';
import { bool, func, string } from 'prop-types';

import AuthPanel from 'auth/components/AuthPanel';
import Pill from 'shared/components/Pill';

import LoginForm from '../LoginForm';
import styles from './Login.scss';

export default class Login extends React.PureComponent {
  static propTypes = {
    onCancel: func.isRequired,
    loading: bool.isRequired,
    login: func.isRequired,
    redirect: func.isRequired,
    selectedSecretWord: string.isRequired,
    setSelectedSecretWord: func.isRequired
  };

  render() {
    const {
      onCancel,
      loading,
      login,
      redirect,
      selectedSecretWord,
      setSelectedSecretWord
    } = this.props;

    return (
      <AuthPanel
        footer
        onCancel={onCancel}
        className={styles.login}
        footerText="New to nOS? Create an Account"
        redirect={redirect}
      >
        <div className={styles.content}>
          <div className={styles.title}>Log In</div>
          {selectedSecretWord && <Pill className={styles.pill}>{selectedSecretWord}</Pill>}
          <LoginForm
            disabled={loading}
            onLogin={login}
            setSelectedSecretWord={setSelectedSecretWord}
          />
        </div>
      </AuthPanel>
    );
  }
}
