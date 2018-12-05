import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import ConversionInputContainer from 'account/components/TransactionsPanel/Send/ConversionInput';
import ConversionInput from 'account/components/TransactionsPanel/Send/ConversionInput/ConversionInput';

const initialState = {
  [spunkyKey]: {
    currency: mockSpunkyLoaded('USD')
  }
};

const defaultProps = {
  asset: {
    scriptHash: 'c9c0fc5a2b66a29d6b14601e752e6e1a445e088d',
    name: 'nOS',
    symbol: 'NOS',
    balance: '100',
    decimals: 8,
    image: 'https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/assets/svg/nos.svg'
  },
  price: 0.05
};

const mountContainer = (props = {}) => {
  return mount(provideStore(
    <ConversionInputContainer {...defaultProps} {...props} />,
    createStore(initialState)
  ));
};

describe('<ConversionInput />', () => {
  it('renders the ConversionInput component', () => {
    const wrapper = mountContainer();
    expect(wrapper.find(ConversionInput).exists()).toBe(true);
  });

  it('passes the currency prop', () => {
    const wrapper = mountContainer();
    expect(wrapper.find(ConversionInput).prop('currency')).toEqual('USD');
  });
});
