import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import Decrypt from 'browser/components/RequestsProcessor/Decrypt/Decrypt';

describe('<Decrypt />', () => {
  const data = 'some text';
  const defaultProps = { data, onResolve: noop };

  it('renders nothing', () => {
    const wrapper = mount(<Decrypt {...defaultProps} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('calls onResolve with decrypted data', () => {
    const onResolve = jest.fn();
    mount(<Decrypt {...defaultProps} onResolve={onResolve} />);
    expect(onResolve).toHaveBeenCalledWith(data);
  });
});
