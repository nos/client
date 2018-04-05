import React from 'react';
import { func } from 'prop-types';

import Confirm from '../../Confirm';

export default class SampleConfirm extends React.Component {
  static propTypes = {
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  render() {
    return (
      <Confirm title="DApp Request" onConfirm={this.handleConfirm} onCancel={this.handleCancel}>
        Would you like to perform this action?
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
