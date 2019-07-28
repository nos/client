import React from 'react';
import { mount } from 'enzyme';

import AppCard from 'appstore/components/AppCard/AppCard';

describe('<AppCard />', () => {
  const defaultProps = {
    app: {
      title: 'mockTitle',
      blurb: 'mockBlurb',
      url: 'mockUrl',
      img_url: 'mockImgUrl'
    },
    openApp: jest.fn()
  };

  it('renders correctly', () => {
    const wrapper = mount(<AppCard {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
