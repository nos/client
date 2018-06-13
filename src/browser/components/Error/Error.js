import React from 'react';
import { string, number } from 'prop-types';

import styles from './Error.scss';

export default class Error extends React.Component {
  static propTypes = {
    target: string.isRequired,
    code: number.isRequired,
    description: string.isRequired
  }

  render() {
    return (
      <div className={styles.error}>
        {this.renderTitle()}
        {this.renderDescription()}
      </div>
    );
  }

  renderTitle() {
    return (
      <h1>Error {this.props.code}</h1>
    );
  }

  renderDescription() {
    return (
      <div>
        <p>
          <strong>{this.props.target}</strong> could not be found.
        </p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
