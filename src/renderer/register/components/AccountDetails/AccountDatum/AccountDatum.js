import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { string, func } from 'prop-types';
import { noop, toLower, startCase } from 'lodash';

import Icon from 'shared/components/Icon';
import Tooltip from 'shared/components/Tooltip';

import styles from './AccountDatum.scss';

export default class AccountDatum extends React.PureComponent {
  static propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    showInfoToast: func
  };

  static defaultProps = {
    showInfoToast: noop
  }

  render() {
    const { label, value } = this.props;

    return (
      <div className={styles.accountDatum}>
        <div className={styles.label}>
          {label}
          <Tooltip id={label} overlay={`Copy ${toLower(label)}`}>
            <CopyToClipboard text={value} onCopy={this.handleCopy}>
              <Icon className={styles.copy} name="copy" aria-label={label} />
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
    const { showInfoToast, label } = this.props;
    showInfoToast(`${startCase(toLower(label))} copied to clipboard.`);
  }
}
