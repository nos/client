import React from 'react';
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
    search: ''
  };

  render() {
    return (
      <Dropdown
        className={classNames(styles.dropdown, this.props.className)}
        ref={this.props.forwardedRef}
        id={this.props.id}
        open={this.state.open}
        content={this.renderItems()}
        onClick={this.handleShow}
        onClickOutside={this.handleHide}
      >
        {this.renderActiveItem()}
        <CaretIcon className={styles.caret} />
      </Dropdown>
    );
  }

  renderItems = () => {
    const items = this.getItems();

    return (
      <div className={styles.items}>
        {this.renderSearch()}
        {this.renderZeroState(items)}
        {map(items, this.renderItem)}
      </div>
    );
  }

  renderItem = (item) => {
    const { renderItem: Item, value } = this.props;
    const selected = !!value && item.value === value;

    return (
      <div
        key={JSON.stringify(item)}
        className={classNames(styles.item, { selected })}
        {...this.getFocusableProps(item, { selected })}
      >
        <Item item={item} selected={selected} />
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
        className={styles.search}
        id="search"
        placeholder="Start typing to search"
        autoFocus
        value={this.state.search}
        onChange={this.handleSearch}
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
    this.setState({ search: event.target.value });
  }

  handleResetSearch = () => {
    this.setState({ search: '' });
  }

  setOpen = (open) => {
    this.setState({ open, search: '' });
  }

  getItems = () => {
    const { items } = this.props;

    const result = new Sifter(items).search(this.state.search, {
      fields: ['label'],
      sort: [
        { field: 'label', direction: 'asc' },
        { field: 'value', direction: 'asc' }
      ]
    });

    return map(result.items, ({ id }) => items[id]);
  }

  getItem = (value) => {
    return find(this.props.items, { value });
  }

  getFocusableProps = (item, { selected = false, disabled = false } = {}) => {
    if (disabled) {
      return {};
    }

    return {
      role: 'option',
      'aria-selected': selected,
      tabIndex: -1,
      onClick: partial(this.handleChange, item.value)
    };
  }
}
