import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { noop } from 'lodash';

import Logo from 'shared/images/logo.svg';
import Button from 'shared/components/Forms/Button';

import styles from './Version.scss';

export default class Version extends React.PureComponent {
  static propTypes = {
    className: string,
    current: string.isRequired,
    openTab: func
  };

  static defaultProps = {
    className: null,
    openTab: noop
  };

  render() {
    return (
      <div className={classNames(styles.version, this.props.className)}>
        <Logo className={styles.logo} width="36" height="36" />
        <div className={styles.current}>
          <div className={styles.appName}>nOS Client</div>
          Version {this.props.current}
        </div>
        <div className={styles.latest}>
          <Button className={styles.button} onClick={this.handleGithub}>
            GitHub
          </Button>
        </div>
      </div>
    );
  }

  handleGithub = () => {
    this.props.openTab('https://github.com/nos/client');
  };

  handleUpdate = () => {
    this.props.openTab('https://github.com/nos/client/releases');
  };
}
