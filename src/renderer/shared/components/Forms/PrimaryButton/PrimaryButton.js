import React from 'react';
import classNames from 'classnames';
import { string, func } from 'prop-types';
import { omit } from 'lodash';

import Button from '../Button';
import styles from './PrimaryButton.scss';

export default class PrimaryButton extends React.PureComponent {
  static propTypes = {
    className: string,
    forwardedRef: func
  };

  static defaultProps = {
    className: null,
    forwardedRef: null
  };

  render() {
    return (
      <Button
        {...omit(this.props, 'forwardedRef')}
        ref={this.props.forwardedRef}
        className={classNames(styles.primaryButton, this.props.className)}
      />
    );
  }
}
