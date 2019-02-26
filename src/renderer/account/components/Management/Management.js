import React from 'react';
import { string, func } from 'prop-types';

export default class Management extends React.PureComponent {
  static propTypes = {
    className: string,
    __progress__: string.isRequired,
    showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    return <div> HEY </div>;
  }
}
