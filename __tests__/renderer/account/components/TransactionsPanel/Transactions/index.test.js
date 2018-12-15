import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import Transactions from 'account/components/TransactionsPanel/Transactions';

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
  it('passes props to the component the address', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('Transactions').prop('address')).toEqual(address);
  });
});
