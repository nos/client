import React from 'react';
import { string } from 'prop-types';

import Icon from 'shared/components/Icon';

export default function Saved(props) {
  return (
    <span className={props.className}>
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
