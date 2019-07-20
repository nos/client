/* eslint-disable consistent-return */

import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Panel.scss';

export default function Panel(props) {
  return <div className={classNames(styles.panel, props.className)}>{props.children}</div>;
}

Panel.propTypes = {
  className: string,
  children: node
};

Panel.defaultProps = {
  className: null,
  children: null
};
