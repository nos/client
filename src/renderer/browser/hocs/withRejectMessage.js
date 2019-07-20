import React from 'react';
import { func } from 'prop-types';
import { isFunction } from 'lodash';
import { withProgressComponents, withError, progressValues } from 'spunky';
import { compose } from 'recompose';

const { FAILED } = progressValues;

const mapErrorToProps = (error) => ({ error });

export default function withRejectMessage(actions, message, options = {}) {
  class RejectMessageComponent extends React.PureComponent {
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

  return compose(
    withError(actions, mapErrorToProps),
    withProgressComponents(
      actions,
      {
        [FAILED]: RejectMessageComponent
      },
      options
    )
  );
}
