import React from 'react';
import { func } from 'prop-types';
import { noop, omit } from 'lodash';
import { ipcRenderer } from 'electron';

import refShape from 'shared/shapes/refShape';

export default class AddressInput extends React.Component {
  static propTypes = {
    forwardedRef: refShape,
    onQuery: func
  };

  static defaultProps = {
    forwardedRef: null,
    onQuery: noop
  };

  ref = this.props.forwardedRef || React.createRef();

  componentDidMount() {
    ipcRenderer.on('file:open-location', this.handleOpenLocation);
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('file:open-location');
  }

  render() {
    const passDownProps = omit(this.props, 'forwardedRef', 'onQuery');

    return (
      <input
        ref={this.ref}
        type="text"
        placeholder="Search or enter address"
        onKeyDown={this.handleKeyDown}
        {...passDownProps}
      />
    );
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.props.onQuery(event.target.value);
    } else if (event.key === 'Escape') {
      this.ref.current.value = this.props.defaultValue;
      this.ref.current.select();
    }
  }

  handleOpenLocation = () => {
    this.ref.current.select();
    this.ref.current.focus();
  }
}
