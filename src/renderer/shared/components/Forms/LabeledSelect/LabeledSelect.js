import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import Label from '../Label';
import Select from '../Select';
import styles from './LabeledSelect.scss';

export default class LabeledSelect extends React.PureComponent {
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
      <Label htmlFor={id} label={label} className={classNames(styles.labeledSelect, labelClass)}>
        <Select id={id} {...passDownProps} />
      </Label>
    );
  }
}
