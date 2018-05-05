import React from 'react';
import { func } from 'prop-types';
import { isFunction } from 'lodash';
import { withProgressComponents, progressValues } from 'spunky';

const { FAILED } = progressValues;

export default function withRejectMessage(actions, message, options = {}) {
  class RejectMessageComponent extends React.Component {
    static propTypes = {
      onReject: func.isRequired
    };

    componentDidMount() {
      this.props.onReject(isFunction(message) ? message(this.props) : message);
    }

    render() {
      return null;
    }
  }

  return withProgressComponents(actions, {
    [FAILED]: RejectMessageComponent
  }, options);
}
