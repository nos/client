import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetStorage from 'browser/components/RequestsProcessor/GetStorage/GetStorage';

describe('<GetStorage />', () => {
  const defaultProps = {
    data: { foo: 'bar' },
    onResolve: noop,
    onReject: noop
  };

  it('renders nothing', () => {
    const wrapper = mount(<GetStorage {...defaultProps} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  it('calls onResolve with data', () => {
    const onResolve = jest.fn();
    mount(<GetStorage {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith(defaultProps.data);
  });

  it('does not call onReject', () => {
    const onReject = jest.fn();
    mount(<GetStorage {...defaultProps} onReject={onReject} />);
    expect(onReject).not.toHaveBeenCalled();
  });
});
