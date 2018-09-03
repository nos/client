import React from 'react';
import { mount } from 'enzyme';

import LabeledInputContainer from 'shared/components/Forms/LabeledInput';
import LabeledInput from 'shared/components/Forms/LabeledInput/LabeledInput';

const mountContainer = (props = {}) => {
  return mount(<LabeledInputContainer {...props} />);
};

describe('<LabeledInput />', () => {
  it('forwards the ref to the component', () => {
    const wrapper = mountContainer({ id: 'foo', label: 'Foo', ref: React.createRef() });
    expect(wrapper).toForwardRefTo(LabeledInput);
  });
});
