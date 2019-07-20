/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */

import React from 'react';
import classNames from 'classnames';
import { bool, string, node } from 'prop-types';

import styles from './Label.scss';

export default class Label extends React.PureComponent {
  static propTypes = {
    className: string,
    label: node.isRequired,
    disabled: bool,
    children: node
  };

  static defaultProps = {
    className: null,
    disabled: false,
    children: null
  };

  render() {
    const { className, label, disabled, children, ...passDownProps } = this.props;

    return (
      <label
        {...passDownProps}
        className={classNames(styles.wrapper, className, { [styles.disabled]: disabled })}
      >
        <span className={styles.label}>{label}</span>
        {children}
      </label>
    );
  }
}
