import React from 'react';
import classNames from 'classnames';
import { string, node } from 'prop-types';

import Label from '../Label';
import Select from '../Select';
import styles from './LabeledSelect.scss';

export default function LabeledSelect(props) {
  const { id, label, labelClass, ...passDownProps } = props;

  return (
    <Label htmlFor={id} label={label} className={classNames(styles.labeledSelect, labelClass)}>
      <Select id={id} {...passDownProps} />
    </Label>
  );
}

LabeledSelect.propTypes = {
  id: string.isRequired,
  label: node.isRequired,
  labelClass: string
};

LabeledSelect.defaultProps = {
  labelClass: null
};
