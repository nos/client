import React from 'react';
import { mount } from 'enzyme';

import ConversionInput from 'account/components/TransactionsPanel/Send/ConversionInput/ConversionInput';

const defaultProps = {
  asset: {
    scriptHash: 'c9c0fc5a2b66a29d6b14601e752e6e1a445e088d',
    name: 'nOS',
    symbol: 'NOS',
    balance: '100',
    decimals: 8,
    image: 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/assets/svg/nos.svg'
  },
  currency: 'USD',
  price: 0.05
};

const mountContainer = (props = {}) => {
  return mount(<ConversionInput {...defaultProps} {...props} />);
};

describe('<ConversionInput />', () => {
  it('renders the asset input placeholder', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.assetInput input').prop('placeholder')).toEqual('Enter NOS amount');
  });

  it('renders the currency input placeholder', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.currencyInput input').prop('placeholder')).toEqual('Enter USD amount');
  });

  describe('when editing the asset amount', () => {
    it('updates the currency amount', () => {
      const wrapper = mountContainer();
      wrapper.find('.assetInput input').simulate('change', { target: { value: '50' } });
      expect(wrapper.find('.currencyInput input').prop('value')).toEqual('2.50');
    });

    it('rounds to two decimals', () => {
      const wrapper = mountContainer({ price: 0.051 });
      wrapper.find('.assetInput input').simulate('change', { target: { value: '1' } });
      expect(wrapper.find('.currencyInput input').prop('value')).toEqual('0.05');
    });

    it('simulates the onChange callback', () => {
      const onChangeSpy = jest.fn();
      const wrapper = mountContainer({ onChange: onChangeSpy });
      wrapper.find('.assetInput input').simulate('change', { target: { value: '50' } });
      expect(onChangeSpy).toHaveBeenCalledWith('50');
    });
  });

  describe('when editing the currency amount', () => {
    it('simulates the onChange callback', () => {
      const onChangeSpy = jest.fn();
      const wrapper = mountContainer({ onChange: onChangeSpy });
      wrapper.find('.currencyInput input').simulate('change', { target: { value: '50' } });
      expect(onChangeSpy).toHaveBeenCalledWith('1000.00000000');
    });

    it('rounds to the permitted number of asset decimals', () => {
      const onChangeSpy = jest.fn();
      const wrapper = mountContainer({ onChange: onChangeSpy, price: 0.051 });
      wrapper.find('.currencyInput input').simulate('change', { target: { value: '0.48' } });
      expect(onChangeSpy).toHaveBeenCalledWith('9.41176471');
    });

    it('updates the currency amount on blur', () => {
      const wrapper = mountContainer({
        asset: {
          scriptHash: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
          name: 'NEO',
          symbol: 'NEO',
          balance: '100',
          decimals: 0
        },
        price: 8,
        amount: '1'
      });
      const input = wrapper.find('.currencyInput input');
      input.simulate('focus');
      input.simulate('change', { target: { value: '9' } });
      input.simulate('blur');
      wrapper.update();
      expect(wrapper.find('.currencyInput input').prop('value')).toEqual('8.00');
    });
  });
});
