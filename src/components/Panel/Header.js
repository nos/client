import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Header.scss';

export default function Header(props) {
  return <div className={classNames(styles.header, props.className)}>{props.children}</div>;
}

Header.displayName = 'Header';

Header.propTypes = {
  className: string,
  children: node
};

Header.defaultProps = {
  className: null,
  children: null
};
