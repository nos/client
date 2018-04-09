import React from 'react';
import { func } from 'prop-types';
import { isFunction } from 'lodash';

export default function withPrompt(actions, message) {
  return (Component) => {
    return class PromptComponent extends React.Component {
      static propTypes = {
        onReject: func.isRequired
      };

      state = {
        confirmed: false
      };

      componentDidMount() {
        this.prompt();
      }

      render() {
        if (!this.state.confirmed) {
          return null;
        }

        return <Component {...this.props} />;
      }

      prompt = () => {
        // eslint-disable-next-line
        if (window.confirm(isFunction(message) ? message(this.props) : message)) {
          this.setState({ confirmed: true });
        } else {
          this.props.onReject('Cancelled by user');
        }
      };
    };
  };
}
