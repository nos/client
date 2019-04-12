import React from 'react';
import { string, func } from 'prop-types';

import styles from './AuthFooter.scss';

const AuthFooter = ({ text, onClick }) => (
  <div
    className={styles.authFooter}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <div className={styles.text}>{text}</div>
  </div>
);

AuthFooter.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired
};

AuthFooter.defaultProps = {};

export default AuthFooter;
