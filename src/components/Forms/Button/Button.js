import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Button.scss';

export default function Button(props) {
  return (
    <button {...props} className={classNames(styles.button, props.className)} />
  );
}

Button.propTypes = {
  className: string,
  type: string
};

Button.defaultProps = {
  className: null,
  type: 'button'
};
