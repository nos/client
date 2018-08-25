import React from 'react';
import { shallow } from 'enzyme';

import Input from 'shared/components/Forms/Input';

const mountContainer = (props = {}) => {
  return shallow(<Input {...props} />);
};

describe('<Input />', () => {
  it('renders an input', () => {
    const props = { id: 'name', defaultValue: 'foo' };
    const wrapper = mountContainer(props);
    expect(wrapper.type()).toEqual('input');
    expect(wrapper.props()).toEqual(expect.objectContaining(props));
  });

  it('applies a custom className', () => {
    const wrapper = mountContainer({ className: 'passwordField' });
    expect(wrapper.prop('className').split(' ')).toContain('passwordField');
  });
});
