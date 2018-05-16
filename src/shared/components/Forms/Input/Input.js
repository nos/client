import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { omit } from 'lodash';

import styles from './Input.scss';

export default function Input(props) {
  return (
    <label htmlFor={props.id} className={classNames(styles.input, props.className)}>
      <span className={styles.label}>{props.label}</span>
      <input id={props.id} {...omit(props, 'label')} />
    </label>
  );
}

Input.propTypes = {
  className: string,
  id: string,
  label: string.isRequired
};

Input.defaultProps = {
  className: null,
  id: null
};
