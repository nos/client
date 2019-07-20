import React from 'react';
import { isValidElementType } from 'react-is';
import { string, func } from 'prop-types';
import { get, isFunction } from 'lodash';

import withConfirm from 'shared/hocs/withConfirm';

import styles from './styles.scss';

export default function withPrompt(message, optionsOrFn = {}) {
  return (Component) => {
    class PromptComponent extends React.PureComponent {
      static propTypes = {
        confirm: func.isRequired,
        src: string.isRequired,
        onReject: func.isRequired
      };

      state = {
        confirmed: false
      };

      componentDidMount() {
        const options = isFunction(optionsOrFn) ? optionsOrFn(this.props) : optionsOrFn;

        this.props.confirm(<div className={styles.prompt}>{this.renderMessage()}</div>, {
          ...options,
          title: get(options, 'title', 'Permission Request'),
          confirmLabel: 'Confirm',
          onConfirm: this.handleConfirm,
          onCancel: this.handleCancel,
          origin: this.props.src
        });
      }

      render() {
        if (!this.state.confirmed) {
          return null;
        }

        return <Component {...this.props} />;
      }

      renderMessage = () => {
        if (isValidElementType(message)) {
          const Message = message;
          return <Message {...this.props} />;
        } else if (isFunction(message)) {
          return message(this.props);
        } else {
          return message;
        }
      };

      handleConfirm = () => {
        this.setState({ confirmed: true });
      };

      handleCancel = () => {
        this.props.onReject('Cancelled by user.');
      };
    }

    return withConfirm()(PromptComponent);
  };
}
