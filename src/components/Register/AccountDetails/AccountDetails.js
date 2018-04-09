import fs from 'fs';
import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { string, func } from 'prop-types';
import { remote } from 'electron';
import { promisify } from 'es6-promisify';
import { noop, isEmpty } from 'lodash';

import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Icon from '../../Icon';
import accountShape from '../../../shapes/accountShape';
import accountToNEP6 from '../../../util/accountToNEP6';
import styles from './AccountDetails.scss';

const writeFile = promisify(fs.writeFile);

export default class AccountDetails extends React.Component {
  static propTypes = {
    label: string,
    setLabel: func
  };

  static defaultProps = {
    label: '',
    setLabel: noop
  };

  render() {
    const { account } = this.props;

    return (
      <div className={styles.accountDetails}>
        {this.renderSave()}
        <dl>
          {this.renderData('Address', account.address)}
          {this.renderData('Private Key', account.key)}
          {this.renderData('Encrypted Key', account.encryptedKey)}
          {this.renderData('Passphrase', account.passphrase)}
        </dl>
        <div className={styles.actions}>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }

  renderData = (label, value) => {
    /* eslint-disable no-alert */
    return [
      <dt key={`${label}-label`}>
        {label}
        <CopyToClipboard text={value} onCopy={() => window.alert('Copied to clipboard')}>
          <Icon className={styles.copy} name="copy" />
        </CopyToClipboard>
      </dt>,
      <dd key={`${label}-value`}>
        {value}
      </dd>
    ];
    /* eslint-disable no-alert */
  }

  renderSave = () => {
    return (
      <div className={styles.save}>
        <Input
          className={styles.label}
          id="label"
          label="Account Label"
          value={this.props.label}
          onChange={this.handleChangeLabel}
        />
        <Button
          className={styles.button}
          disabled={isEmpty(this.props.label)}
          onClick={this.handleSave}
        >
          Save
        </Button>
      </div>
    );
  }

  handleChangeLabel = (event) => {
    this.props.setLabel(event.target.value);
  }

  handleSave = () => {
    const filename = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
      title: 'Save NEP6 Wallet',
      filters: [{ name: 'NEP6 Wallet File', extensions: ['json'] }]
    });

    if (filename) {
      this.save(filename);
    }
  }

  save = async (filename) => {
    const { label, account } = this.props;
    const data = JSON.stringify(accountToNEP6({ ...account, label }));

    try {
      await writeFile(filename, data);
    } catch (err) {
      window.alert(`Error saving file: ${err.message}`); // eslint-disable-line no-alert
    }
  }
}

AccountDetails.propTypes = {
  account: accountShape.isRequired
};
