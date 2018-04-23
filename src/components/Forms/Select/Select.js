import React from 'react';
import classNames from 'classnames';
import { oneOfType, object, array, func, string } from 'prop-types';

import styles from './Select.scss';

const Select = (props) => {
  return (
    <select className={classNames(styles.select, props.className)} onChange={props.onChange}>
      {props.children}
    </select>
  );
};

Select.propTypes = {
  className: string,
  children: oneOfType([object, array]).isRequired,
  onChange: func.isRequired
};

Select.defaultProps = {
  className: null
};

export default Select;
