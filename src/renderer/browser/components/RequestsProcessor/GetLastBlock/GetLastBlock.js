import React from 'react';
import { func } from 'prop-types';

import blockShape from 'shared/shapes/blockShape';

export default class GetLastBlock extends React.PureComponent {
  static propTypes = {
    block: blockShape,
    onResolve: func.isRequired,
    onReject: func.isRequired
  };

  static defaultProps = {
    block: null
  };

  componentDidMount() {
    const { block, onResolve, onReject } = this.props;

    if (block) {
      onResolve(block);
    } else {
      onReject('Unavailable');
    }
  }

  render() {
    return null;
  }
}
