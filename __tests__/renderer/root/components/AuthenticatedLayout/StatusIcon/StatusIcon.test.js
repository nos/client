import React from 'react';
import { mount } from 'enzyme';

import StatusIcon from 'root/components/AuthenticatedLayout/StatusIcon/StatusIcon';
import StatusConnected from 'shared/images/icons/statusConnected.svg';
import StatusDisconnected from 'shared/images/icons/statusDisconnected.svg';
import StatusUnknown from 'shared/images/icons/statusUnknown.svg';
import block from 'fixtures/block.json';

describe('<StatusIcon />', () => {
  const error = 'Test error';

  it('renders disconnected icon', () => {
    const wrapper = mount(<StatusIcon error={error} block={block} />);
    expect(wrapper.find(StatusDisconnected).exists()).toBe(true);
  });

  it('renders connected icon', () => {
    const wrapper = mount(<StatusIcon block={block} />);
    expect(wrapper.find(StatusConnected).exists()).toBe(true);
  });

  it('renders unknown icon', () => {
    const wrapper = mount(<StatusIcon />);
    expect(wrapper.find(StatusUnknown).exists()).toBe(true);
  });
});
