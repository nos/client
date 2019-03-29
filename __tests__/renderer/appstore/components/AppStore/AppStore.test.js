import React from 'react';
import { mount } from 'enzyme';

import AppStore from 'appstore/components/AppStore/AppStore';

describe('<AppStore />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<AppStore />);
    expect(wrapper).toMatchSnapshot();
  });
});
