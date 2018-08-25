import React from 'react';
import { mount } from 'enzyme';

import LabeledInput from 'shared/components/Forms/LabeledInput';
import Label from 'shared/components/Forms/Label';
import Input from 'shared/components/Forms/Input';

const mountContainer = (props = {}) => {
  return mount(<LabeledInput {...props} />);
};

describe('<LabeledInput />', () => {
  it('renders a label', () => {
    const wrapper = mountContainer({ id: 'name', label: 'Name' });
    const label = wrapper.find(Label);
    expect(label.exists()).toBe(true);
    expect(label.props()).toEqual(expect.objectContaining({ label: 'Name', htmlFor: 'name' }));
  });

  it('renders an input', () => {
    const inputProps = { id: 'pw', type: 'password', defaultValue: 'foo' };
    const wrapper = mountContainer({ label: 'Password', ...inputProps });
    const input = wrapper.find(Input);
    expect(input.exists()).toBe(true);
    expect(input.props()).toEqual(expect.objectContaining(inputProps));
  });
});
