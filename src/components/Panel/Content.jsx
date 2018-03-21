import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Content.scss';

export default function Content(props) {
  return <div className={classNames(styles.content, props.className)}>{props.children}</div>;
}

Content.displayName = 'Content';

Content.propTypes = {
  className: string,
  children: node
};

Content.defaultProps = {
  className: null,
  children: null
};
