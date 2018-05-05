import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { string } from 'prop-types';
import { upperFirst, lowerCase } from 'lodash';

import Icon from 'shared/components/Icon';
import Tooltip from 'shared/components/Tooltip';

import styles from './AccountDatum.scss';

const COPIED_DURATION = 2000;

export default class AccountDetails extends React.Component {
  static propTypes = {
    label: string.isRequired,
    value: string.isRequired
  };

  state = { copied: false };

  render() {
    const { label, value } = this.props;

    return (
      <div className={styles.accountDatum}>
        <div className={styles.label}>
          {label}
          <Tooltip id={label} overlay={this.getTooltip()}>
            <CopyToClipboard text={value} onCopy={this.handleCopy}>
              <Icon className={styles.copy} name={this.getIcon()} aria-describedby={label} />
            </CopyToClipboard>
          </Tooltip>
        </div>
        <div className={styles.value}>
          {value}
        </div>
      </div>
    );
  }

  handleCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), COPIED_DURATION);
  }

  getTooltip = () => {
    const { label } = this.props;
    return upperFirst(lowerCase(this.state.copied ? `${label} copied!` : `Copy ${label}`));
  }

  getIcon = () => {
    return this.state.copied ? 'check' : 'copy';
  }
}
