import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetAddress from 'browser/components/RequestsProcessor/GetAddress/GetAddress';

describe('<GetAddress />', () => {
  const address = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';
  const defaultProps = { address, onResolve: noop };

  it('renders nothing', () => {
    const wrapper = mount(<GetAddress {...defaultProps} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('calls onResolve with address', () => {
    const onResolve = jest.fn();
    mount(<GetAddress {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith(address);
  });
});
