import React from 'react';
import ReactDOM from 'react-dom';
import Sifter from 'sifter';
import classNames from 'classnames';
import { string, func, arrayOf } from 'prop-types';
import { noop, map, partial, find } from 'lodash';

import Input from '../Input';
import Dropdown from '../../Dropdown';
import DefaultItem from './DefaultItem';
import CaretIcon from '../../../images/inputs/caret.svg';
import selectItemShape from '../../../shapes/selectItemShape';
import styles from './Select.scss';

export default class Select extends React.PureComponent {
  static propTypes = {
    className: string,
    forwardedRef: func,
    id: string.isRequired,
    placeholder: string,
    items: arrayOf(selectItemShape),
    value: string,
    renderItem: func,
    onChange: func
  };

  static defaultProps = {
    className: null,
    forwardedRef: null,
    placeholder: '',
    items: [],
    value: null,
    renderItem: DefaultItem,
    onChange: noop
  };

  state = {
    open: false,
    search: '',
    selectedIndex: -1
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.selectedIndex !== prevState.selectedIndex) {
      this.scrollToItem(this.state.selectedIndex);
    }
  }

  render() {
    return (
      <Dropdown
        className={classNames(styles.select, this.props.className)}
        ref={this.props.forwardedRef}
        id={this.props.id}
        open={this.state.open}
        content={this.renderOptions()}
        onClick={this.handleShow}
        onClickOutside={this.handleHide}
      >
        {this.renderActiveItem()}
        <CaretIcon className={styles.caret} />
      </Dropdown>
    );
  }

  renderOptions = () => {
    const items = this.getItems();

    return (
      <div className={styles.options}>
        {this.renderSearch()}
        {this.renderZeroState(items)}
        {this.renderItems(items)}
      </div>
    );
  }

  renderItems = (items) => {
    return (
      <div className={styles.items}>
        {map(items, this.renderItem)}
      </div>
    );
  }

  renderItem = (item, index) => {
    const { renderItem: Item, value } = this.props;
    const focus = index === this.state.selectedIndex;
    const selected = !!value && item.value === value;

    const className = classNames(styles.item, {
      [styles.focus]: focus,
      [styles.selected]: selected
    });

    return (
      <div
        key={JSON.stringify(item)}
        className={className}
        {...this.getFocusableProps(item, index, { selected })}
      >
        <Item
          ref={this.registerRef(`item${index}`)}
          item={item}
          selected={selected}
        />
      </div>
    );
  }

  renderZeroState = (items) => {
    if (items.length > 0) {
      return null;
    }

    return (
      <div className={styles.noResults}>
        <span>No matches found. </span>
        <span role="button" tabIndex={0} onClick={this.handleResetSearch}>Clear search.</span>
      </div>
    );
  }

  renderActiveItem = () => {
    const { value, placeholder, renderItem: Item } = this.props;

    if (!value) {
      return <div className={styles.input}>{placeholder}</div>;
    }

    return (
      <div className={styles.input}>
        <Item
          className={styles.activeItem}
          item={this.getItem(value)}
        />
      </div>
    );
  }

  renderSearch = () => {
    return (
      <Input
        ref={this.registerRef('search')}
        className={styles.search}
        id="search"
        placeholder="Start typing to search"
        autoFocus
        value={this.state.search}
        onChange={this.handleSearch}
        onKeyDown={this.handleKeyDown}
      />
    );
  }

  handleShow = () => {
    this.setOpen(true);
  }

  handleHide = () => {
    this.setOpen(false);
  }

  handleChange = (value) => {
    this.props.onChange(value);
    this.setOpen(false);
  }

  handleSearch = (event) => {
    this.setSearch(event.target.value);
  }

  handleResetSearch = () => {
    this.setSearch('');
    this.search.focus();
  }

  handleKeyDown = (event) => {
    const { selectedIndex } = this.state;

    // eslint-disable-next-line default-case
    switch (event.key) {
      case 'ArrowUp':
        if (selectedIndex > 0) {
          event.preventDefault();
          this.incrementSelection(-1);
        }
        break;

      case 'ArrowDown':
        if (selectedIndex < this.getItems().length - 1) {
          event.preventDefault();
          this.incrementSelection(+1);
        }
        break;

      case 'Enter':
        if (selectedIndex !== -1) {
          const items = this.getItems();
          this.handleChange(items[selectedIndex].value);
        }
        break;

      case 'Escape':
        this.setOpen(false);
        break;
    }
  }

  handleMouseOver = (index) => {
    this.setState({ selectedIndex: index });
  }

  registerRef = (name) => (el) => {
    this[name] = el;
  }

  setOpen = (open) => {
    this.setState({ open, search: '', selectedIndex: -1 });
  }

  setSearch = (search) => {
    this.setState({ search, selectedIndex: -1 });
  }

  getItems = () => {
    const { items } = this.props;

    const result = new Sifter(items).search(this.state.search, {
      fields: ['label']
    });

    return map(result.items, ({ id }) => items[id]);
  }

  getItem = (value) => {
    return find(this.props.items, { value });
  }

  getFocusableProps = (item, index, { selected = false, disabled = false } = {}) => {
    if (disabled) {
      return {};
    }

    return {
      role: 'option',
      'aria-selected': selected,
      tabIndex: -1,
      onClick: partial(this.handleChange, item.value),
      onMouseOver: partial(this.handleMouseOver, index)
    };
  }

  incrementSelection = (offset) => {
    this.setState((prevState) => ({
      selectedIndex: prevState.selectedIndex + offset
    }));
  }

  scrollToItem = (index) => {
    const item = this[`item${index}`];

    // eslint-disable-next-line react/no-find-dom-node
    const element = item && ReactDOM.findDOMNode(item);

    if (element) {
      element.scrollIntoViewIfNeeded(false);
    }
  }
}
