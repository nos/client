import React from 'react';
import { func, node } from 'prop-types';

export default class OnClickOutside extends React.PureComponent {
  static propTypes = {
    onClickOutside: func,
    children: node
  };

  static defaultProps = {
    onClickOutside: null,
    children: null
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }

  handleClickOutside = (event) => {
    if (
      !event.target.outerHTML.toLowerCase().includes('toast') &&
      event.target.outerHTML.toLowerCase().includes('backdrop')
    ) {
      this.props.onClickOutside();
    }
  };

  setWrapperRef = (el) => {
    this.wrapperRef = el;
  };
}
