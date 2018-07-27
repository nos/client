import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import Icon from 'shared/components/Icon';

import styles from './Saved.scss';

export default function Saved(props) {
  return (
    <span className={classNames(styles.saved, props.className)}>
      Saved! <Icon name="check" />
    </span>
  );
}

Saved.propTypes = {
  className: string
};

Saved.defaultProps = {
  className: null
};
