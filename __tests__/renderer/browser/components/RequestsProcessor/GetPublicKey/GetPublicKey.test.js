import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetPublicKey from 'browser/components/RequestsProcessor/GetPublicKey/GetPublicKey';

describe('<GetPublicKey />', () => {
  const publicKey = '031d8e1630ce640966967bc6d95223d21f44304133003140c3b52004dc981349c9';
  const defaultProps = { publicKey, onResolve: noop };

  it('renders nothing', () => {
    const wrapper = mount(<GetPublicKey {...defaultProps} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('calls onResolve with public key', () => {
    const onResolve = jest.fn();
    mount(<GetPublicKey {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith(publicKey);
  });
});
