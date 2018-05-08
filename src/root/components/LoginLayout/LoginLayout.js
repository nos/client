import React from 'react';
import { node } from 'prop-types';

import styles from './LoginLayout.scss';

export default function LoginLayout(props) {
  return (
    <div className={styles.loginLayout}>
      {props.children}
    </div>
  );
}

LoginLayout.displayName = 'LoginLayout';

LoginLayout.propTypes = {
  children: node
};

LoginLayout.defaultProps = {
  children: null
};
