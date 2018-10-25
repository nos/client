import React from 'react';
import classNames from 'classnames';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import Logo from 'shared/images/logo.svg';
import Loading from 'shared/components/Loading';
import PrimaryButton from 'shared/components/Forms/PrimaryButton';
import Button from 'shared/components/Forms/Button';

import styles from './Version.scss';

export default class Version extends React.PureComponent {
  static propTypes = {
    className: string,
    loading: bool,
    current: string.isRequired,
    latest: string,
    openTab: func
  };

  static defaultProps = {
    className: null,
    loading: false,
    latest: null,
    openTab: noop
  };

  render() {
    return (
      <div className={classNames(styles.version, this.props.className)}>
        <Logo className={styles.logo} />
        <div className={styles.current}>
          <div className={styles.appName}>nOS Client</div>
          Version {this.props.current}
        </div>
        <div className={styles.latest}>
          {this.renderLatest()}
          <Button className={styles.button} onClick={this.handleGithub}>
            GitHub
          </Button>
        </div>
      </div>
    );
  }

  renderLatest = () => {
    if (this.props.loading) {
      return this.renderLoading();
    } else if (this.props.current === this.props.latest) {
      return this.renderUpToDate();
    } else {
      return this.renderUpdate();
    }
  }

  renderLoading = () => {
    return <Loading className={styles.loading} />;
  }

  renderUpToDate = () => {
    return (
      <div className={styles.upToDate}>
        nOS is up to date
      </div>
    );
  }

  renderUpdate = () => {
    return (
      <div className={styles.update}>
        <div className={styles.messaging}>
          <strong>Update Available</strong>
          Version {this.props.latest}
        </div>
        <PrimaryButton className={styles.button} onClick={this.handleUpdate}>
          Update
        </PrimaryButton>
      </div>
    );
  }

  handleGithub = () => {
    this.props.openTab('https://github.com/nos/client');
  }

  handleUpdate = () => {
    this.props.openTab('https://github.com/nos/client/releases');
  }
}
