import React from 'react';
import { string } from 'prop-types';

import styles from './SidePanel.scss';

const SidePanel = ({ step, title, text }) => (
  <div className={styles.sidePanel}>
    <div className={styles.step}>Step {step} / 3</div>
    <div className={styles.title}>{title}</div>
    <span role="img" aria-label="description">
      {text}
    </span>
  </div>
);

SidePanel.propTypes = {
  step: string.isRequired,
  title: string.isRequired,
  text: string.isRequired
};

SidePanel.defaultProps = {};

export default SidePanel;
