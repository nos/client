import React from 'react';
import classNames from 'classnames';
import { bool, string, node } from 'prop-types';

import refShape from 'shared/shapes/refShape';

import Label from '../Label';
import Select from '../Select';
import styles from './LabeledSelect.scss';

export default class LabeledSelect extends React.PureComponent {
  static propTypes = {
    forwardedRef: refShape,
    id: string.isRequired,
    label: node.isRequired,
    labelClass: string,
    disabled: bool
  };

  static defaultProps = {
    forwardedRef: null,
    labelClass: null,
    disabled: false
  };

  render() {
    const { id, label, labelClass, disabled, forwardedRef, ...passDownProps } = this.props;
    const className = classNames(styles.labeledSelect, labelClass);

    return (
      <Label htmlFor={id} label={label} disabled={disabled} className={className}>
        <Select id={id} ref={forwardedRef} disabled={disabled} {...passDownProps} />
      </Label>
    );
  }
}
