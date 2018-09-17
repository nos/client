import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { omit } from 'lodash';

import refShape from 'shared/shapes/refShape';

import Button from '../Button';
import styles from './PrimaryButton.scss';

export default class PrimaryButton extends React.PureComponent {
  static propTypes = {
    className: string,
    forwardedRef: refShape
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
