import React from 'react';
import { mount } from 'enzyme';

import CategoryTitle from 'appstore/components/CategoryTitle/CategoryTitle';

describe('<CategoryTitle />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<CategoryTitle>TestTitle</CategoryTitle>);
    expect(wrapper).toMatchSnapshot();
  });
});
