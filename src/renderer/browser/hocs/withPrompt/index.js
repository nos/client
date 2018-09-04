import React from 'react';
import { string, func } from 'prop-types';
import { isFunction } from 'lodash';

import withConfirm from 'shared/hocs/withConfirm';

import styles from './styles.scss';

export default function withPrompt(message) {
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
        this.props.confirm((
          <div className={styles.prompt}>
            <p>{this.renderMessage()}</p>
            <p className={styles.source}>Triggered by <strong>{this.props.src}</strong>.</p>
          </div>
        ), {
          title: 'Account Action Permission Request',
          onConfirm: this.handleConfirm,
          onCancel: this.handleCancel
        });
      }

      render() {
        if (!this.state.confirmed) {
          return null;
        }

        return <Component {...this.props} />;
      }

      renderMessage = () => {
        const output = isFunction(message) ? message(this.props) : message;
        const lines = output.split(/[\r\n]/);

        return lines.map((line, i) => (
          <React.Fragment key={line}>
            {line}
            {i === lines.length - 1 ? null : <br />}
          </React.Fragment>
        ));
      }

      handleConfirm = () => {
        this.setState({ confirmed: true });
      }

      handleCancel = () => {
        this.props.onReject('Cancelled by user.');
      }
    }

    return withConfirm()(PromptComponent);
  };
}
