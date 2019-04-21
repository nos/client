import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import Encrypt from 'browser/components/RequestsProcessor/Encrypt/Encrypt';

describe('<Encrypt />', () => {
  const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
  const mac = '9cbce3044af030d0c1d6ede34179e7f6ba7ede8c6f9553b96e6a824c952a48c9';
  const data = '46b2fac9a8b2123fc498c42d123fd14b';
  const defaultProps = { iv, mac, data, onResolve: noop };

  it('renders nothing', () => {
    const wrapper = mount(<Encrypt {...defaultProps} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('calls onResolve with encrypted data', () => {
    const onResolve = jest.fn();
    mount(<Encrypt {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith({ iv, mac, data });
  });
});
