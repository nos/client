import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetLastBlock from 'browser/components/RequestsProcessor/GetLastBlock/GetLastBlock';
import block from 'fixtures/block.json';

describe('<GetLastBlock />', () => {
  const defaultProps = { block, onResolve: noop, onReject: noop };

  it('renders nothing', () => {
    const wrapper = mount(<GetLastBlock {...defaultProps} />);
    expect(wrapper.children()).toHaveLength(0);
  });

  describe('when given a block', () => {
    it('calls onResolve with block', () => {
      const onResolve = jest.fn();
      mount(<GetLastBlock {...defaultProps} onResolve={onResolve} />);
      expect(onResolve).toHaveBeenCalledWith(block);
    });
  });

  describe('when not given a block', () => {
    it('calls onReject with error message', () => {
      const onReject = jest.fn();
      mount(<GetLastBlock {...defaultProps} block={null} onReject={onReject} />);
      expect(onReject).toHaveBeenCalledWith('Unavailable');
    });
  });
});
