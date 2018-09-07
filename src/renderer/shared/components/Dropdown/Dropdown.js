/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */

import React from 'react';
import classNames from 'classnames';
import { bool, string, func, node } from 'prop-types';
import { noop, pick, omit } from 'lodash';

import Portal from '../Portal';
import { defaultScrollSpy } from '../../lib/scrollSpy';
import styles from './Dropdown.scss';

const canFitInDirections = (overlap, childBounds, dropdownDimensions, windowDimensions) => {
  const yOffset = overlap ? childBounds.top : childBounds.bottom;
  const fitFromTop = dropdownDimensions.height <= childBounds.top;
  const fitFromBottom = (yOffset + dropdownDimensions.height) <= windowDimensions.height;

  return { top: fitFromTop, bottom: fitFromBottom };
};

export default class Dropdown extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    content: node,
    open: bool,
    overlap: bool,
    onClick: func,
    onClickOutside: func
  };

  static defaultProps = {
    className: null,
    children: null,
    content: null,
    open: false,
    overlap: false,
    onClick: noop,
    onClickOutside: noop
  };

  state = {
    position: {
      visibility: 'hidden',
      top: '-9999px',
      left: '-9999px'
    },
    width: null
  };

  componentDidMount() {
    this.setPosition();
    defaultScrollSpy.subscribe(this.handleReposition);
    window.addEventListener('resize', this.handleReposition);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setPosition();
    }
  }

  componentWillUnmount() {
    defaultScrollSpy.unsubscribe(this.handleReposition);
    window.removeEventListener('resize', this.handleReposition);
  }

  render() {
    return (
      <div className={classNames(styles.dropdown, this.props.className)}>
        {this.renderContainer()}
        {this.renderPortal()}
      </div>
    );
  }

  renderContainer = () => {
    const { children, open, onClick } = this.props;

    return (
      <div
        ref={this.registerRef('container')}
        className={styles.container}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  renderPortal = () => {
    const portalProps = pick(this.props, 'onClickOutside');
    const contentProps = omit(
      this.props, 'className', 'children', 'content', 'open', 'overlap', 'onClick', 'onClickOutside'
    );

    return (
      <Portal {...portalProps}>
        <div
          ref={this.registerRef('dropdown')}
          {...contentProps}
          className={styles.portal}
          style={this.getDropdownStyles()}
        >
          {this.renderContent()}
        </div>
      </Portal>
    );
  }

  renderContent = () => {
    if (!this.props.open) {
      return null;
    }

    return this.props.content;
  }

  handleReposition = () => {
    this.setPosition();
  }

  registerRef = (name) => (el) => {
    this[name] = el;
  }

  setPosition = () => {
    this.setState(this.calculateDropdownProps());
  }

  getContainerBounds = () => {
    return this.container.getBoundingClientRect();
  }

  getWindowDimensions = () => {
    const { body } = document;
    return { width: body.clientWidth, height: body.clientHeight };
  }

  getDropdownDimensions() {
    const { dropdown } = this;
    return { width: dropdown.clientWidth, height: dropdown.clientHeight };
  }

  calculateDropdownProps = () => {
    const containerBounds = this.getContainerBounds();
    const dropdownDimensions = this.getDropdownDimensions();
    const windowDimensions = this.getWindowDimensions();

    const canFit = canFitInDirections(
      this.props.overlap,
      containerBounds,
      dropdownDimensions,
      windowDimensions
    );

    const position = this.getPositionForDirection(
      containerBounds,
      dropdownDimensions,
      !canFit.bottom
    );

    return { position, ...this.getDropdownWidthProps(containerBounds) };
  }

  getPositionForDirection = (containerBounds, dropdownDimensions, dropUp) => {
    const yOrigin = containerBounds.top + (this.props.overlap ? 0 : containerBounds.height);
    const yOffset = dropUp ? containerBounds.height - dropdownDimensions.height : 0;

    return { top: yOrigin + yOffset, left: containerBounds.left };
  }

  getDropdownWidthProps = (containerBounds) => {
    return { width: containerBounds.width };
  }

  getDropdownStyles() {
    const dropdownWidthStyle = this.state.width
      ? { width: `${this.state.width}px` }
      : {};

    return {
      ...dropdownWidthStyle,
      ...this.state.position
    };
  }
}
