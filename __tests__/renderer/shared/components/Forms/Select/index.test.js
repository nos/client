import React from 'react';
import { mount } from 'enzyme';

import SelectContainer from 'shared/components/Forms/Select';
import Select from 'shared/components/Forms/Select/Select';

const mountContainer = (props = {}) => {
  return mount(<SelectContainer {...props} />);
};

describe('<Select />', () => {
  it('forwards the ref to the component', () => {
    const wrapper = mountContainer({ id: 'name', ref: React.createRef() });
    expect(wrapper).toForwardRefTo(Select);
  });
});
