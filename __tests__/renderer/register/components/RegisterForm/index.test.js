import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded, addLoadedListener } from 'testHelpers';

import RegisterForm from 'register/components/RegisterForm';

const initialState = {
  [spunkyKey]: {
    currentNetwork: mockSpunkyLoaded('MainNet')
  }
};

describe('<RegisterForm />', () => {
  let store;

  beforeEach(() => {
    store = createStore(initialState);
  });

  const mountContainer = (props = {}) => {
    return mount(provideStore(<MemoryRouter><RegisterForm {...props} /></MemoryRouter>, store));
  };

  const addRegisterLoadedListener = (callback) => {
    addLoadedListener(store, 'createAccount', callback);
  };

  describe('when passwords match', () => {
    it('creates an account', (done) => {
      addRegisterLoadedListener(done);

      const wrapper = mountContainer();
      wrapper.find('input#passphrase').simulate('change', { target: { value: 'test' } });
      wrapper.find('input#passphraseConfirmation').simulate('change', { target: { value: 'test' } });
      wrapper.find('form').simulate('submit');
    }, 10000);
  });
});
