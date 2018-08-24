/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import styles from './Label.scss';

export default class Label extends React.PureComponent {
  static propTypes = {
    className: string,
    label: node.isRequired,
    htmlFor: string.isRequired,
    children: node
  };

  static defaultProps = {
    className: null,
    children: null
  };

  render() {
    const { className, label, children, htmlFor, ...passDownProps } = this.props;

    return (
      <label {...passDownProps} htmlFor={htmlFor} className={classNames(styles.wrapper, className)}>
        <span className={styles.label}>
          {label}
        </span>
        {children}
      </label>
    );
  }
}
