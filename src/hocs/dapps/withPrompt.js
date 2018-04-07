import React from 'react';
import {func} from 'prop-types';
import {isFunction} from 'lodash';
import {withProgressComponents} from 'spunky';

export default function withPrompt(actions, message, options = {}) {
  return (Component) => {
    return class PromptComponent extends React.Component {

      constructor(props) {
        super(props);
        this.state = { Component: null };
      }

      static propTypes = {
        onReject: func.isRequired
      };

      componentDidMount() {
        if (window.confirm(isFunction(message) ? message(this.props) : message)) {
          this.setState({Component: Component});
        } else {
          this.props.onReject('Cancelled by user');
        }
      }

      render() {
        const { Component } = this.state;
        if (!Component) {
          return null;
        }

        return <Component {...this.props} />;
      }
    }
  }
}