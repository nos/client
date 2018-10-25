import React from 'react';
import { string } from 'prop-types';

export default function Loading(props) {
  return <div className={props.className}>Loading...</div>;
}

Loading.propTypes = {
  className: string
};

Loading.defaultProps = {
  className: null
};
