import React from 'react';
import classNames from 'classnames';
import { bool, string, func, node, arrayOf, oneOf } from 'prop-types';
import { noop, debounce, pick, omit, find, head } from 'lodash';

import Portal from '../Portal';
import styles from './Dropdown.scss';

const DEFAULT_ORDER = ['bottom', 'top'];

const RESIZE_TIMEOUT = 50;

const canFitInDirections = (childBounds, dropdownDimensions, windowDimensions) => {
  const fitFromTop = dropdownDimensions.height <= childBounds.top;
  const fitFromRight = dropdownDimensions.width <= childBounds.right;
  const fitFromBottom = (childBounds.bottom + dropdownDimensions.height) <= windowDimensions.height;
  const fitFromLeft = (childBounds.left + dropdownDimensions.width) <= windowDimensions.width;

  return { top: fitFromTop, right: fitFromRight, bottom: fitFromBottom, left: fitFromLeft };
};

export default class Dropdown extends React.PureComponent {
  static propTypes = {
    className: string,
    children: node,
    content: node,
    open: bool,
    preferredDirections: arrayOf(oneOf(DEFAULT_ORDER)),
    onClick: func,
    onClickOutside: func
  };

  static defaultProps = {
    className: null,
    children: null,
    content: null,
    open: false,
    preferredDirections: DEFAULT_ORDER,
    onClick: noop,
    onClickOutside: noop
  };

  state = {
    direction: DEFAULT_ORDER[0],
    position: {
      visibility: 'hidden',
      top: '-9999px',
      left: '-9999px'
    },
    width: null
  };

  componentDidMount() {
    this.setPosition();

    this.handleResize = debounce(() => this.setPosition(), RESIZE_TIMEOUT);
    window.addEventListener('resize', this.handleResize);

    // TODO: register scrolling window & element events
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setPosition(nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);

    // TODO: unregister scrolling window & element events
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
        role="combobox"
        tabIndex={0}
        aria-controls=""
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
      this.props, 'className', 'children', 'content', 'open', 'preferredDirections', 'onClick',
      'onClickOutside'
    );
    const className = classNames(styles.portal, {
      [styles[this.state.direction]]: true
    });

    return (
      <Portal {...portalProps}>
        <div
          ref={this.registerRef('dropdown')}
          {...contentProps}
          className={className}
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

  registerRef = (name) => (el) => {
    this[name] = el;
  }

  setPosition = (props = this.props) => {
    this.setState(this.calculateDropdownProps(props.preferredDirections));
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

  calculateDropdownProps = (preferredDirections) => {
    const containerBounds = this.getContainerBounds();
    const dropdownDimensions = this.getDropdownDimensions();
    const windowDimensions = this.getWindowDimensions();

    const direction = this.calculateBestDirection(
      preferredDirections,
      containerBounds,
      dropdownDimensions,
      windowDimensions
    );

    const position = this.getPositionForDirection(containerBounds, direction);

    return { direction, position, ...this.getDropdownWidthProps(containerBounds) };
  }

  calculateBestDirection = (preferredDirections, ...args) => {
    const possibleDirections = canFitInDirections(...args);

    const preferredDirection = find(preferredDirections, (direction) => {
      return possibleDirections[direction];
    });

    return preferredDirection || head(preferredDirections);
  }

  getPositionForDirection = (containerBounds, direction) => {
    return { top: containerBounds[direction], left: containerBounds.left };
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
