import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Page.scss';

export default function Page(props) {
  return (
    <div className={classNames(styles.page, props.className)}>
      {props.children}
    </div>
  );
}

Page.propTypes = {
  className: string,
  children: node
};

Page.defaultProps = {
  className: null,
  children: null
};
