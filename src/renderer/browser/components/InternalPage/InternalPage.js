import React from 'react';
import { bool, string, func } from 'prop-types';
import { noop } from 'lodash';

import tabShape from 'browser/shapes/tabShape';
import getInternalPageComponent from 'shared/util/getInternalPageComponent';

export default class InternalPage extends React.PureComponent {
  static propTypes = {
    className: string,
    tab: tabShape.isRequired,
    active: bool,
    onFocus: func
  };

  static defaultProps = {
    className: null,
    active: false,
    onFocus: noop
  };

  state = {
    component: null
  };

  async componentWillMount() {
    this.setState({ component: await getInternalPageComponent(this.props.tab.target) });
  }

  componentDidMount() {
    if (this.props.active) {
      this.props.onFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.active) {
      this.props.onFocus();
    }
  }

  render() {
    const Component = this.state.component;

    if (!Component) {
      return null;
    }

    return <Component className={this.props.className} />;
  }
}
