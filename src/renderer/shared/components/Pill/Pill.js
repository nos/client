import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Pill.scss';

export default function Pill(props) {
  return (
    <div className={classNames(styles.pill, props.className)}>
      <div className={styles.container}>
        <div className={styles.text}>
          Secret Word:
          <span className={styles.bold}> {props.children}</span>
        </div>
      </div>
    </div>
  );
}

Pill.propTypes = {
  className: string,
  children: node
};

Pill.defaultProps = {
  className: null,
  children: null
};
