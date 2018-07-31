import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import TransactionsPanel from 'account/components/TransactionsPanel';
import { NEO } from 'shared/values/assets';

const initialState = {
  [spunkyKey]: {
    currentNetwork: mockSpunkyLoaded('MainNet'),
    auth: mockSpunkyLoaded({
      address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
      wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG'
    })
  }
};

const defaultProps = {
  balances: {
    [NEO]: {
      scriptHash: NEO,
      name: 'NEO',
      symbol: 'NEO',
      decimals: 0,
      balance: '0'
    }
  }
};

const mountContainer = (props = {}) => {
  return mount(provideStore(
    <TransactionsPanel {...defaultProps} {...props} />,
    createStore(initialState)
  ));
};

describe('<TransactionsPanel />', () => {
  it('renders the Send tab contents', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('Send').exists()).toBe(true);
    expect(wrapper.find('Receive').exists()).toBe(false);
  });

  it('switches to the Receive tab', () => {
    const wrapper = mountContainer();
    wrapper.find('IconTab').filterWhere((el) => el.text() === 'Receive').simulate('click');
    expect(wrapper.find('Send').exists()).toBe(false);
    expect(wrapper.find('Receive').exists()).toBe(true);
  });
});
