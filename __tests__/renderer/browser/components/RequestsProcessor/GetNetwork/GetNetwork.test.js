import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetNetwork from 'browser/components/RequestsProcessor/GetNetwork/GetNetwork';

describe('<GetNetwork />', () => {
  const network = 'MainNet';
  const neoscan = 'https://api.neoscan.org/api/main_net';
  const servers = ['http://seed1.neo.org', 'http://seed2.neo.org'];
  const defaultProps = { network, neoscan, servers, onResolve: noop };

  it('renders nothing', () => {
    const wrapper = mount(<GetNetwork {...defaultProps} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('calls onResolve with address', () => {
    const onResolve = jest.fn();
    mount(<GetNetwork {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith({ network, neoscan, servers });
  });
});
