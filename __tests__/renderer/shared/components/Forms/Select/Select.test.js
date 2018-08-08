import React from 'react';
import { mount } from 'enzyme';

import Select from 'shared/components/Forms/Select/Select';
import Dropdown from 'shared/components/Dropdown';

const mountContainer = (props = {}) => {
  return mount(<Select {...props} />);
};

describe('<Select />', () => {
  it('renders a dropdown', () => {
    const wrapper = mountContainer({ id: 'name' });
    expect(wrapper.find(Dropdown).exists()).toBe(true);
  });

  it('applies a custom className', () => {
    const wrapper = mountContainer({ id: 'currency', className: 'currency' });
    expect(wrapper.prop('className').split(' ')).toContain('currency');
  });
});
