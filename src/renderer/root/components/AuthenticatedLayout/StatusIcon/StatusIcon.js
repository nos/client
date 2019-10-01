import React from 'react';
import { string } from 'prop-types';
import { omit } from 'lodash';

import blockShape from 'shared/shapes/blockShape';
import StatusConnected from 'shared/images/icons/statusConnected.svg';
import StatusDisconnected from 'shared/images/icons/statusDisconnected.svg';
import StatusUnknown from 'shared/images/icons/statusUnknown.svg';

export default class StatusIcon extends React.PureComponent {
  static propTypes = {
    className: string,
    error: string,
    block: blockShape
  };

  static defaultProps = {
    className: null,
    error: null,
    block: null
  };

  render() {
    const Icon = this.getIcon();
    const passDownProps = omit(this.props, 'dispatch', 'error', 'block');

    return <Icon {...passDownProps} className={this.props.className} />;
  }

  getIcon = () => {
    if (this.props.error) {
      return StatusDisconnected;
    } else if (this.props.block) {
      return StatusConnected;
    } else {
      return StatusUnknown;
    }
  };
}
