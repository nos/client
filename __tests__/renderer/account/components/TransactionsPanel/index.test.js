import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import TransactionsPanel from 'account/components/TransactionsPanel';
import Send from 'account/components/TransactionsPanel/Send';

import Transactions from 'account/components/TransactionsPanel/Transactions';

import Receive from 'account/components/TransactionsPanel/Receive';
import IconTab from 'account/components/TransactionsPanel/IconTab';
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
  [spunkyKey]: {
    balances: mockSpunkyLoaded({
      [NEO]: {
        scriptHash: NEO,
        name: 'NEO',
        symbol: 'NEO',
        decimals: 0,
        balance: '0'
      }
    }),
    prices: mockSpunkyLoaded({
      [NEO]: 7.65
    })
  }
};

const mountContainer = (props = {}) => {
  const store = createStore(initialState);
  return mount(provideStore(<TransactionsPanel {...defaultProps} {...props} />, store));
};

describe('<TransactionsPanel />', () => {
  it('renders the Send tab contents', () => {
    const wrapper = mountContainer();

    expect(wrapper.find(Send).exists()).toBe(true);
    expect(wrapper.find(Transactions).exists()).toBe(false);
    expect(wrapper.find(Receive).exists()).toBe(false);
  });

  it('switches to the Receive tab', () => {
    const wrapper = mountContainer();
    wrapper
      .find(IconTab)
      .filterWhere((el) => el.text() === 'Receive')
      .simulate('click');
    expect(wrapper.find(Send).exists()).toBe(false);
    expect(wrapper.find(Receive).exists()).toBe(true);
  });
});
