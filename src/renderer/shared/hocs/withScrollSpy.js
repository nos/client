import React from 'react';

import { defaultScrollSpy } from 'shared/lib/scrollSpy';

export default function withScrollSpy(Component) {
  return class ScrollSpyComponent extends React.PureComponent {
    componentDidMount() {
      this.component.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      this.component.removeEventListener('scroll', this.handleScroll);
    }

    render() {
      return <Component {...this.props} ref={this.registerRef} />;
    }

    handleScroll = (event) => {
      defaultScrollSpy.publish(event);
    }

    registerRef = (el) => {
      this.component = el;
    }
  };
}
