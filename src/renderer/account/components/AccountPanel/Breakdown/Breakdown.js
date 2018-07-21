import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import styles from './Breakdown.scss';

export default function Breakdown(props) {
  return (
    <div className={classNames(styles.breakdown, props.className)}>
      <em>
        Holdings Breakdown Chart<br />
        (coming soon!)
      </em>
    </div>
  );
}

Breakdown.propTypes = {
  className: string
};

Breakdown.defaultProps = {
  className: null
};
