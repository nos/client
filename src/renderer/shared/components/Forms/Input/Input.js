import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';
import { omit } from 'lodash';

import styles from './Input.scss';

export default class Input extends React.Component {
  static propTypes = {
    className: string,
    id: string.isRequired,
    label: string
  };

  static defaultProps = {
    className: null,
    label: null
  };

  render() {
    const { id, className } = this.props;

    return (
      <label htmlFor={id} className={classNames(styles.input, className)}>
        {this.renderLabel()}
        <input id={id} {...omit(this.props, 'className', 'label')} />
      </label>
    );
  }

  renderLabel = () => {
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return <span className={styles.label}>{label}</span>;
  }
}
