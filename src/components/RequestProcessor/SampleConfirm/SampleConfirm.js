import React from 'react';
import { func, any, arrayOf } from 'prop-types';

export default class SampleConfirm extends React.Component {
  static propTypes = {
    args: arrayOf(any).isRequired,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  componentDidMount() {
    console.log('API called with args:', this.props.args); // eslint-disable-line no-console

    if (window.confirm('Would you like to perform this action?')) { // eslint-disable-line no-alert
      this.props.onResolve();
    } else {
      this.props.onReject('Cancelled by user');
    }
  }

  render() {
    return null;
  }
}
