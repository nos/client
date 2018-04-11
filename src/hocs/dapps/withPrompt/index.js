import React from 'react';
import { string, func } from 'prop-types';
import { isFunction } from 'lodash';

import Confirm from '../../../components/Confirm';
import styles from './styles.scss';

export default function withPrompt(message) {
  return (Component) => {
    return class PromptComponent extends React.Component {
      static propTypes = {
        src: string.isRequired,
        onReject: func.isRequired
      };

      state = {
        confirmed: false
      };

      render() {
        if (!this.state.confirmed) {
          return this.renderConfirm();
        }

        return <Component {...this.props} />;
      }

      renderConfirm = () => {
        return (
          <Confirm
            className={styles.prompt}
            title="Account Action Permission Request"
            onConfirm={this.handleConfirm}
            onCancel={this.handleCancel}
          >
            <p>{isFunction(message) ? message(this.props) : message}</p>
            <p className={styles.source}>Triggered by <strong>{this.props.src}</strong>.</p>
          </Confirm>
        );
      }

      handleConfirm = () => {
        this.setState({ confirmed: true });
      }

      handleCancel = () => {
        this.props.onReject('Cancelled by user.');
      }
    };
  };
}
