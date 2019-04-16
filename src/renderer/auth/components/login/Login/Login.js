import React from 'react';
import { bool, func, string } from 'prop-types';

import AuthPanel from 'auth/components/AuthPanel';

import LoginForm from '../LoginForm';
import styles from './Login.scss';

// const Login = ({ onCancel, secretWord, loading, login, redirect }) => (
//   <Panel className={styles.login}>
//     <div className={styles.content}>
//       <CloseIcon className={styles.closeIcon} onClick={onCancel} />

//       <div className={styles.title}>Log In</div>
//       <div className={styles.heading}>
//         <div className={styles.pill}>
//           <div className={styles.pillText}>
//             Secret word: <b>{secretWord}</b>
//           </div>
//         </div>
//       </div>
//       <LoginForm disabled={loading} onLogin={login} />
//     </div>

//     {/* <AuthFooter text="New to nOS? Create Wallet" onClick={redirect} /> */}
//   </Panel>
// );

const Login = ({ onCancel, secretWord, loading, login, redirect }) => (
  <AuthPanel
    footer
    onCancel={onCancel}
    className={styles.register}
    footerText="daojwda"
    redirect={redirect}
  >
    <div className={styles.content}>
      <div className={styles.title}>Log In</div>
      <div className={styles.heading}>
        <div className={styles.pill}>
          <div className={styles.pillText}>
            Secret word: <b>{secretWord}</b>
          </div>
        </div>
      </div>
      <LoginForm disabled={loading} onLogin={login} />
    </div>
  </AuthPanel>
);

Login.propTypes = {
  onCancel: func.isRequired,
  secretWord: string.isRequired,
  loading: bool.isRequired,
  login: func.isRequired,
  redirect: func.isRequired
};

export default Login;
