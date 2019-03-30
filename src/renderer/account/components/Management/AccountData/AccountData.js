import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import Input from 'shared/components/Forms/Input';
import instanceShape from 'shared/shapes/instanceShape';

import styles from './AccountData.scss';

export default class AccountData extends React.PureComponent {
  static propTypes = {
    className: string,
    instance: instanceShape,
    encryptedMnemonic: string
  };

  static defaultProps = {
    className: null,
    instance: null,
    encryptedMnemonic: ''
  };

  state = {
    hidden: true
  };

  render() {
    const { className, encryptedMnemonic, instance } = this.props;

    return (
      <div className={classNames(styles.accountData, className)}>
        {this.renderSecretView({ encryptedMnemonic, instance })}
        {this.renderPublicView({ instance })}
      </div>
    );
  }

  renderSecretView = ({ encryptedMnemonic, instance }) => (
    <div className={styles.secretView}>
      <div className={styles.heading}>
        <div>{encryptedMnemonic ? 'Secret Words' : 'Private Key'}</div>
        <div
          className={styles.toggle}
          onClick={this.handleToggleHidden}
          role="button"
          tabIndex={0}
        >
          Show & Unlock
        </div>
      </div>
      <div className={styles.data}>
        <Input
          readOnly
          className={styles.input}
          type={this.state.hidden ? 'password' : 'text'}
          value={encryptedMnemonic || instance.privateKey}
        />
      </div>
    </div>
  );

  renderPublicView = ({ instance }) => (
    <React.Fragment>
      {instance && (
        <div className={styles.publicView}>
          <div className={styles.heading}>Public Address</div>
          <Input
            readOnly
            className={styles.input}
            type="text"
            value={instance.address}
          />
        </div>
      )}
    </React.Fragment>
  );

  handleToggleHidden = () => {
    const prevState = this.state.hidden;
    this.setState({ hidden: !prevState });
  };
}
