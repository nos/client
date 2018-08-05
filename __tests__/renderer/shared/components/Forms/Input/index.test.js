import React from 'react';
import { mount } from 'enzyme';

import InputContainer from 'shared/components/Forms/Input';
import Input from 'shared/components/Forms/Input/Input';

const mountContainer = (props = {}) => {
  return mount(<InputContainer {...props} />);
};

describe('<Input />', () => {
  it('forwards the ref to the component', () => {
    const wrapper = mountContainer({ ref: React.createRef() });
    expect(wrapper).toForwardRefTo(Input);
  });
});
