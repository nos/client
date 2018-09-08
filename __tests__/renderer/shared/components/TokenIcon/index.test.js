import React from 'react';
import { mount } from 'enzyme';

import TokenIcon from 'shared/components/TokenIcon';
import NeoIcon from 'shared/images/tokens/neo.svg';
import GasIcon from 'shared/images/tokens/gas.svg';
import { NEO, GAS } from 'shared/values/assets';

const mountContainer = (props = {}) => {
  return mount(<TokenIcon {...props} />);
};

describe('<TokenIcon />', () => {
  it('renders NEO icon', () => {
    const wrapper = mountContainer({ scriptHash: NEO });
    expect(wrapper.find(NeoIcon).exists()).toBe(true);
  });

  it('renders GAS icon', () => {
    const wrapper = mountContainer({ scriptHash: GAS });
    expect(wrapper.find(GasIcon).exists()).toBe(true);
  });

  it('renders custom image', () => {
    const props = { image: 'https://example.com/rpx.png', symbol: 'RPX' };
    const wrapper = mountContainer(props);
    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.prop('src')).toEqual(props.image);
    expect(image.prop('alt')).toEqual(props.symbol);
  });

  it('renders fallback image', () => {
    const wrapper = mountContainer({ scriptHash: 'invalid' });
    expect(wrapper.find(NeoIcon).exists()).toBe(true);
  });
});
