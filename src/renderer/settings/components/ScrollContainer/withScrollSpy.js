import React from 'react';

import { defaultScrollSpy } from 'shared/lib/scrollSpy';

export default function withScrollSpy(Component) {
  return class ScrollSpyComponent extends React.PureComponent {
    componentDidMount() {
      this.node.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      this.node.removeEventListener('scroll', this.handleScroll);
    }

    render() {
      return <Component {...this.props} ref={this.registerRef} />;
    }

    handleScroll = (event) => {
      defaultScrollSpy.publish(event);
    };

    registerRef = (el) => {
      this.component = el;
    };

    get node() {
      return this.component.node;
    }
  };
}
