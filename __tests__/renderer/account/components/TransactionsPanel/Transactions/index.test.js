import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import Transactions from 'account/components/Portfolio/TransactionsPanel/Transactions';

const address = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';

const initialState = {
  [spunkyKey]: {
    auth: mockSpunkyLoaded({ address })
  }
};

const mountContainer = (props = {}) => {
  return mount(provideStore(<Transactions {...props} />, createStore(initialState)));
};

describe('<Transactions />', () => {
  it('renders the transactions panel', () => {
    const wrapper = mountContainer();
    expect(wrapper.find(Transactions).exists()).toBe(true);
  });
});
