import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import Label from '../Label';
import Input from '../Input';
import styles from './LabeledInput.scss';

export default class LabeledInput extends React.PureComponent {
  static propTypes = {
    id: string.isRequired,
    label: node.isRequired,
    labelClass: string
  };

  static defaultProps = {
    labelClass: null
  };

  render() {
    const { id, label, labelClass, ...passDownProps } = this.props;

    return (
      <Label htmlFor={id} label={label} className={classNames(styles.labeledInput, labelClass)}>
        <Input id={id} {...passDownProps} />
      </Label>
    );
  }
}
