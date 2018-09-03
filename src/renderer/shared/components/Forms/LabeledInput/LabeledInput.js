import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import refShape from 'shared/shapes/refShape';

import Label from '../Label';
import Input from '../Input';
import styles from './LabeledInput.scss';

export default class LabeledInput extends React.PureComponent {
  static propTypes = {
    forwardedRef: refShape,
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
