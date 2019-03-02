import React from 'react';
import { CopyToClipboard } from '@nosplatform/react-copy-to-clipboard';
import { string, func, bool } from 'prop-types';
import { noop, toLower, startCase, times } from 'lodash';

import Icon from 'shared/components/Icon';
import Tooltip from 'shared/components/Tooltip';

import styles from './AccountDatum.scss';

export default class AccountDatum extends React.PureComponent {
  static propTypes = {
    label: string.isRequired,
    value: string.isRequired,
    showInfoToast: func,
    hidden: bool
  };

  static defaultProps = {
    showInfoToast: noop,
    hidden: false
  };

  state = {
    showHidden: false
  };

  render() {
    const { label, value, hidden } = this.props;
    const { showHidden } = this.state;

    return (
      <div className={styles.accountDatum}>
        <div className={styles.label}>
          {label}
          <Tooltip id={label} overlay={`Copy ${toLower(label)}`}>
            <CopyToClipboard text={value} onCopy={this.handleCopy}>
              <Icon
                className={styles.icon}
                name="copy"
                role="button"
                tabIndex={0}
                aria-label={label}
              />
            </CopyToClipboard>
          </Tooltip>
        </div>
        {hidden && !showHidden ? (
          <React.Fragment>
            <div className={styles.value}>
              {times(value.length, () => '*')}
              <Tooltip id={label} overlay={`Show ${toLower(label)}`}>
                <Icon
                  className={styles.icon}
                  name="unhide"
                  role="button"
                  tabIndex={0}
                  aria-label={label}
                  onClick={this.handleToggleHidden}
                />
              </Tooltip>
            </div>
          </React.Fragment>
        ) : (
          <div className={styles.value}>{value}</div>
        )}
      </div>
    );
  }

  handleToggleHidden = () => {
    const prevState = this.state.showHidden;
    this.setState({ showHidden: !prevState });
  };

  handleCopy = () => {
    const { showInfoToast, label } = this.props;
    showInfoToast(`${startCase(toLower(label))} copied to clipboard.`);
  };
}
