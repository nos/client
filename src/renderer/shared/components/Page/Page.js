import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Page.scss';

export default function Page(props) {
  return <div {...props} className={classNames(styles.page, props.className)} />;
}

Page.propTypes = {
  className: string
};

Page.defaultProps = {
  className: null
};
