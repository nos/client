import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './SectionContent.scss';

export default function SectionContent(props) {
  return <div className={classNames(styles.sectionContent, props.className)}>{props.children}</div>;
}

SectionContent.propTypes = {
  className: string,
  children: node
};

SectionContent.defaultProps = {
  className: null,
  children: null
};
