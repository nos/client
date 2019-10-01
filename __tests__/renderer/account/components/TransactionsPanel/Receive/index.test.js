import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import Receive from 'account/components/Portfolio/TransactionsPanel/Receive';

const address = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';

const initialState = {
  [spunkyKey]: {
    auth: mockSpunkyLoaded({ address })
  }
};

const mountContainer = (props = {}) => {
  return mount(provideStore(<Receive {...props} />, createStore(initialState)));
};

describe.skip('<Receive />', () => {
  it('passes props to the component the address', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('Receive').prop('address')).toEqual(address);
  });
});
