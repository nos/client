import React from 'react';
import { mount } from 'enzyme';

import LabeledSelectContainer from 'shared/components/Forms/LabeledSelect';
import LabeledSelect from 'shared/components/Forms/LabeledSelect/LabeledSelect';

const mountContainer = (props = {}) => {
  return mount(<LabeledSelectContainer {...props} />);
};

describe('<LabeledSelect />', () => {
  it('forwards the ref to the component', () => {
    const wrapper = mountContainer({ ref: React.createRef() });
    expect(wrapper).toForwardRefTo(LabeledSelect);
  });
});
