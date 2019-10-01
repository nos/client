import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';

import styles from './SectionTitle.scss';

export default function SectionTitle(props) {
  const Icon = props.renderIcon;

  return (
    <div className={classNames(styles.sectionTitle, props.className)}>
      <Icon className={styles.icon} />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

SectionTitle.propTypes = {
  className: string,
  children: node,
  renderIcon: func.isRequired
};

SectionTitle.defaultProps = {
  className: null,
  children: null
};
