import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import { Account } from 'account';
import { NEO, GAS } from 'shared/values/assets';
import { DEFAULT_CURRENCY } from 'shared/values/currencies';

const initialState = {
  [spunkyKey]: {
    currency: mockSpunkyLoaded(DEFAULT_CURRENCY),
    currentNetwork: mockSpunkyLoaded('MainNet'),
    auth: mockSpunkyLoaded({
      address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
      wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG'
    }),
    balances: mockSpunkyLoaded({
      [NEO]: {
        scriptHash: NEO,
        name: 'NEO',
        symbol: 'NEO',
        decimals: 0,
        balance: '12'
      },
      [GAS]: {
        scriptHash: GAS,
        name: 'GAS',
        symbol: 'GAS',
        decimals: 8,
        balance: '3.12345678'
      }
    }),
    prices: mockSpunkyLoaded({
      NEO: 31.50,
      GAS: 10.25
    })
  }
};

const mountAccount = (state = initialState) => {
  const store = createStore(state);
  return mount(provideStore(<Account />, store));
};

describe('<Account />', () => {
  it('renders the account panel', () => {
    const wrapper = mountAccount();
    expect(wrapper.find('AccountPanel').exists()).toBe(true);
  });

  it('renders the send panel', () => {
    const wrapper = mountAccount();
    expect(wrapper.find('SendPanel').exists()).toBe(true);
  });
});
