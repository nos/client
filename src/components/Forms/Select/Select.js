import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Select.scss';

const Select = (props) => {
  return (
    <select {...props} className={classNames(styles.select, props.className)} />
  );
};

Select.propTypes = {
  className: string
};

Select.defaultProps = {
  className: null
};

export default Select;
