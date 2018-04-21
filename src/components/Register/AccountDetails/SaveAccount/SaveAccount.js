import fs from 'fs';
import React from 'react';
import { string, func } from 'prop-types';
import { remote } from 'electron';
import { promisify } from 'es6-promisify';
import { noop, isEmpty } from 'lodash';

import Input from '../../../Forms/Input';
import Button from '../../../Forms/Button';
import accountShape from '../../../../shapes/accountShape';
import accountToNEP6 from '../../../../util/accountToNEP6';
import styles from './SaveAccount.scss';

const writeFile = promisify(fs.writeFile);

export default class SaveAccount extends React.Component {
  static propTypes = {
    account: accountShape.isRequired,
    label: string,
    setLabel: func,
    alert: func
  };

  static defaultProps = {
    label: '',
    setLabel: noop,
    alert: noop
  };

  render() {
    return (
      <div className={styles.saveAccount}>
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
      this.props.alert(`Error saving file: ${err.message}`);
    }
  }
}
