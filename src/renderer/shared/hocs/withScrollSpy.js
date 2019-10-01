/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';

import { defaultScrollSpy } from 'shared/lib/scrollSpy';

export default function withScrollSpy(Component) {
  return class ScrollSpyComponent extends React.PureComponent {
    component = React.createRef();

    componentDidMount() {
      ReactDOM.findDOMNode(this.component.current).addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      ReactDOM.findDOMNode(this.component.current).removeEventListener('scroll', this.handleScroll);
    }

    render() {
      return <Component {...this.props} ref={this.component} />;
    }

    handleScroll = (event) => {
      defaultScrollSpy.publish(event);
    };
  };
}
