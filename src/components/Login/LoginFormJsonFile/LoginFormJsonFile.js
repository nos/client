
import React from 'react';
import { bool, string, func } from 'prop-types'; import { noop } from 'lodash';

import ReactFileReader from 'react-file-reader'
import Button from '../../Forms/Button';
import styles from './LoginFormJsonFile.scss';

export default class LoginFormJsonFile extends React.Component {
  static propTypes = {
    disabled: bool,
    wif: string,
    setWIF: func,
    onLogin: func
  };


  static defaultProps = {
    disabled: false,
    wif: '',
    setWIF: noop,
    onLogin: noop
  };


handleFiles = files => {
    const { setWIF } = this.props;

    var reader = new FileReader();
    reader.onload = e =>
    {
    let keyStoreJSON = JSON.parse(reader.result);

    let accounts = keyStoreJSON.accounts.map(accounts =>
      {
        return accounts.key
      });

    setWIF(accounts[0]);
    this.handleLogin();
    }
  reader.readAsText(files[0]);
}

handleLogin = () => {
  const { wif, onLogin } = this.props;
  onLogin({ wif });
}

  render() {
    const { disabled } = this.props;

    return (
      <div className={styles.actions}>
        <p>Upload your Keystore Json file.</p>
        <ReactFileReader  fileTypes={'.json'}
                          multipleFiles={false}
                          handleFiles={this.handleFiles}>
            <Button type="submit" disabled={disabled}>Upload</Button>
        </ReactFileReader>
      </div>
    );

  }
}
