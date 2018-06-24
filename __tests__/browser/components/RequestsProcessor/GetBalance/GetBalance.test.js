import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import GetBalance from 'browser/components/RequestsProcessor/GetBalance/GetBalance';
import { NEO, GAS } from 'values/assets';

describe('<GetBalance />', () => {
  const defaultProps = {
    asset: NEO,
    balances: {
      [NEO]: { scriptHash: NEO, balance: '12', decimals: 0 },
      [GAS]: { scriptHash: GAS, balance: '1.00000007', decimals: 8 }
    },
    onResolve: noop,
    onReject: noop
  };

  it('renders nothing', () => {
    const wrapper = mount(<GetBalance {...defaultProps} />);
    expect(wrapper.children().length).toBe(0);
  });

  describe('recognized asset', () => {
    const asset = NEO;

    it('calls onResolve with asset balance', () => {
      const onResolve = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onResolve={onResolve} />);
      expect(onResolve).toHaveBeenCalledWith('12');
    });

    it('does not call onReject', () => {
      const onReject = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onReject={onReject} />);
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('unrecognized asset', () => {
    const asset = 'ceab719b8baa2310f232ee0d277c061704541cfb';

    it('calls onResolve with 0-value balance', () => {
      const onResolve = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onResolve={onResolve} />);
      expect(onResolve).toHaveBeenCalledWith('0');
    });

    it('does not call onReject', () => {
      const onReject = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onReject={onReject} />);
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('malformed asset', () => {
    const asset = 'bad-value';

    it('calls onReject', () => {
      const onReject = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onReject={onReject} />);
      expect(onReject).toHaveBeenCalledWith(`Invalid asset hash: "${asset}"`);
    });

    it('does not call onResolve', () => {
      const onResolve = jest.fn();
      mount(<GetBalance {...defaultProps} asset={asset} onResolve={onResolve} />);
      expect(onResolve).not.toHaveBeenCalled();
    });
  });
});
