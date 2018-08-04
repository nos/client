import React from 'react';
import { func, node } from 'prop-types';

import styles from './IconTab.scss';

export default function IconTab(props) {
  const Icon = props.renderIcon;

  return (
    <div className={styles.iconTab}>
      <Icon className={styles.icon} />
      <span className={styles.label}>{props.children}</span>
    </div>
  );
}

IconTab.propTypes = {
  renderIcon: func.isRequired,
  children: node.isRequired
};
