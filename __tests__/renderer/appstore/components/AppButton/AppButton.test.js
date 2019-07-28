import React from 'react';
import { mount } from 'enzyme';

import AppButton from 'appstore/components/AppButton/AppButton';

describe('<AppButton />', () => {
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
    const wrapper = mount(<AppButton {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
