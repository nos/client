import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import blockShape from 'shared/shapes/blockShape';

import styles from './LastBlock.scss';

export default class LastBlock extends React.PureComponent {
  static propTypes = {
    currentNetwork: string.isRequired,
    error: string,
    block: blockShape
  };

  static defaultProps = {
    error: null,
    block: null
  };

  render() {
    const { currentNetwork } = this.props;

    return (
      <div className={styles.lastBlock}>
        <div className={styles.network}>
          <span className={classNames(styles.icon, this.getIconClassName())} />
          <span className={styles.name}>{currentNetwork}</span>
        </div>
        {this.renderDetails()}
      </div>
    );
  }

  renderDetails = () => {
    const { block, error } = this.props;

    if (!block && !error) {
      return <div className={styles.block}>Connecting...</div>;
    }

    if (!block) {
      return <div className={styles.block}>Disconnected</div>;
    }

    const timestamp = this.getTimestamp(block);

    return (
      <div className={styles.block}>
        <div className={styles.index}>
          <div className={styles.heading}>Last Block</div>
          {block ? Number(block.index).toLocaleString() : 'Unknown'}
        </div>
        <div className={styles.time}>
          <div className={styles.heading}>Time</div>
          {block ? block.time : 'Unknown'}
          {timestamp && `, ${timestamp}`}
        </div>
      </div>
    );
  };

  getIconClassName = () => {
    if (this.props.error) {
      return styles.disconnected;
    } else if (this.props.block) {
      return styles.connected;
    } else {
      return styles.connecting;
    }
  };

  getTimestamp = (block) => {
    if (!block) {
      return null;
    }

    return new Date(block.time * 1000).toLocaleTimeString();
  };
}
