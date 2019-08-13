import React from 'react';
import { mount } from 'enzyme';

import Select from 'shared/components/Forms/Select/Select';
import DefaultItem from 'shared/components/Forms/Select/DefaultItem';
import Dropdown from 'shared/components/Dropdown';
import Portal from 'shared/components/Portal';

const mountContainer = (props = {}) => {
  return mount(<Select {...props} />);
};

describe('<Select />', () => {
  const items = [{ label: 'Foo', value: 'foo' }, { label: 'Bar', value: 'bar' }];

  it('renders a dropdown', () => {
    const wrapper = mountContainer({ id: 'name' });
    expect(wrapper.find(Dropdown).exists()).toBe(true);
  });

  it('applies a custom className', () => {
    const wrapper = mountContainer({ id: 'currency', className: 'currency' });
    expect(wrapper.prop('className').split(' ')).toContain('currency');
  });

  it('renders the selected value', () => {
    const wrapper = mountContainer({ id: 'name', items, value: 'foo' });
    expect(wrapper.find(DefaultItem).text()).toEqual('Foo');
  });

  it('does not render dropdown items', () => {
    const wrapper = mountContainer({ id: 'name', items });
    expect(wrapper.find(Portal).find(DefaultItem)).toHaveLength(0);
  });

  it('renders dropdown items once clicked', () => {
    const wrapper = mountContainer({ id: 'name', items });
    wrapper
      .find(Dropdown)
      .find('.container')
      .simulate('click');

    const options = wrapper.find(Portal).find(DefaultItem);
    expect(options).toHaveLength(2);
    expect(options.at(0).text()).toEqual('Foo');
    expect(options.at(1).text()).toEqual('Bar');
  });

  it('calls onChange when a value is clicked', () => {
    const onChangeSpy = jest.fn();
    const wrapper = mountContainer({ id: 'name', items, onChange: onChangeSpy });

    wrapper
      .find(Dropdown)
      .find('.container')
      .simulate('click');
    wrapper
      .find(Portal)
      .findWhere((node) => node.prop('className') === 'item' && node.text() === 'Bar')
      .simulate('click');

    expect(onChangeSpy).toHaveBeenCalledWith('bar');
  });
});
