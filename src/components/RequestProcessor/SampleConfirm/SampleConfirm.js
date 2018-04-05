import React from 'react';
import { string, func } from 'prop-types';

import Confirm from '../../Confirm';

export default class SampleConfirm extends React.Component {
  static propTypes = {
    src: string.isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  render() {
    return (
      <Confirm title="DApp Request" onConfirm={this.handleConfirm} onCancel={this.handleCancel}>
        Would you like to permit <strong>{this.props.src}</strong> to perform this action?
      </Confirm>
    );
  }

  handleConfirm = () => {
    this.props.onResolve();
  }

  handleCancel = () => {
    this.props.onReject('Cancelled by user.');
  }
}
