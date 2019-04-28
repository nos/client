import React from 'react';
import QRCode from 'qrcode.react';
import classNames from 'classnames';
import { CopyToClipboard } from '@nosplatform/react-copy-to-clipboard';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import PrimaryButton from 'shared/components/Forms/PrimaryButton';

import styles from './Receive.scss';

export default class Receive extends React.PureComponent {
  static propTypes = {
    className: string,
    address: string.isRequired,
    showInfoToast: func
  };

  static defaultProps = {
    className: null,
    showInfoToast: noop
  };

  render() {
    const { className, address } = this.props;

    return (
      <div className={classNames(styles.receive, className)}>
        <div className={styles.label}>My public wallet address</div>
        <div className={styles.address}>{address}</div>

        <CopyToClipboard text={address} onCopy={this.handleCopy}>
          <PrimaryButton className={styles.copy}>Copy to clipboard</PrimaryButton>
        </CopyToClipboard>

        <div className={styles.label}>My wallet QR code</div>
        <QRCode className={styles.qrcode} value={address} />
      </div>
    );
  }

  handleCopy = () => {
    this.props.showInfoToast('Address copied to clipboard.');
  };
}
