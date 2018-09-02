import React from 'react';
import classNames from 'classnames';
import { string, func, node } from 'prop-types';

import Label from '../Label';
import Input from '../Input';
import styles from './LabeledInput.scss';

export default class LabeledInput extends React.PureComponent {
  static propTypes = {
    forwardedRef: func,
    id: string.isRequired,
    label: node.isRequired,
    labelClass: string
  };

  static defaultProps = {
    forwardedRef: null,
    labelClass: null
  };

  render() {
    const { id, label, labelClass, forwardedRef, ...passDownProps } = this.props;

    return (
      <Label htmlFor={id} label={label} className={classNames(styles.labeledInput, labelClass)}>
        <Input id={id} ref={forwardedRef} {...passDownProps} />
      </Label>
    );
  }
}
