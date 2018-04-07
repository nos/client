import React from 'react';
import { func } from 'prop-types';
import { isFunction } from 'lodash';

export default function withPrompt(actions, message) {
  return (Component) => {
    return class PromptComponent extends React.Component {
      static propTypes = {
        onReject: func.isRequired
      };

      constructor(props) {
        super(props);
        this.state = { Component: null };
      }

      componentDidMount() {
        this.prompt();
      }

      render() {
        if (!this.state.Component) {
          return null;
        }

        return <this.state.Component {...this.props} />;
      }

      prompt = () => {
        // eslint-disable-next-line
        if (window.confirm(isFunction(message) ? message(this.props) : message)) {
          this.setState({ Component });
        } else {
          this.props.onReject('Cancelled by user');
        }
      };
    };
  };
}
