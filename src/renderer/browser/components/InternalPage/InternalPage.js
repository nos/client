import React from 'react';
import { string } from 'prop-types';

import tabShape from 'browser/shapes/tabShape';
import getInternalPageComponent from 'shared/util/getInternalPageComponent';

export default class InternalPage extends React.PureComponent {
  static propTypes = {
    className: string,
    tab: tabShape.isRequired
  };

  static defaultProps = {
    className: null
  };

  state = {
    component: null
  };

  async componentWillMount() {
    this.setState({ component: await getInternalPageComponent(this.props.tab.target) });
  }

  render() {
    const Component = this.state.component;

    if (!Component) {
      return null;
    }

    return <Component className={this.props.className} />;
  }
}
