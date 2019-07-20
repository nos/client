import React from 'react';
import { mount } from 'enzyme';
import { noop, get } from 'lodash';
import { progressValues } from 'spunky';
import { wallet } from '@cityofzion/neon-js';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import makeGetPublicKey from 'browser/components/RequestsProcessor/GetPublicKey';
import makePublicKeyActions from 'browser/actions/makePublicKeyActions';

const sessionId = 'abc';
const requestId = '123';

const wif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
const account = new wallet.Account(wif);

const getStore = () =>
  createStore({
    [spunkyKey]: {
      auth: mockSpunkyLoaded({ address: account.address, wif: account.WIF })
    }
  });

describe('<GetPublicKey />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const publicKeyActions = makePublicKeyActions(sessionId, requestId);
  const GetPublicKey = makeGetPublicKey(publicKeyActions);
  const defaultProps = { args: [], onResolve: noop, onReject: noop };

  const mountContainer = (props) => {
    return mount(provideStore(<GetPublicKey {...props} />, store));
  };

  const addPublicKeyLoadedListener = (done) => {
    const unsubscribe = store.subscribe(() => {
      const key = `${spunkyKey}.sessions.${sessionId}.getPublicKey-${requestId}.progress`;
      const progress = get(store.getState(), key);

      if (progress === progressValues.LOADED || progress === progressValues.FAILED) {
        unsubscribe();
        done();
      }
    });
  };

  let callSpy;
  let onResolve;
  let onReject;

  beforeEach(() => {
    callSpy = jest.spyOn(publicKeyActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  describe('on first render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('initiates a public key data call', () => {
      expect(callSpy).toHaveBeenCalled();
    });

    it('renders nothing', () => {
      expect(wrapper.find('NullLoader').length).toBe(1);
    });

    it('does not resolve or reject', () => {
      expect(onResolve).not.toHaveBeenCalled();
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('when public key data has loaded', () => {
    let wrapper;

    beforeEach((done) => {
      addPublicKeyLoadedListener(done);
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('resolves', () => {
      wrapper.update();
      expect(onResolve).toHaveBeenCalledWith(account.publicKey);
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('on unmount', () => {
    let wrapper;

    const getPublicKeyState = () => {
      return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.getPublicKey-${requestId}`);
    };

    beforeEach(() => {
      wrapper = mountContainer(defaultProps);
    });

    it('removes the request from the session', () => {
      expect(getPublicKeyState()).not.toBe(undefined);
      wrapper.unmount();
      expect(getPublicKeyState()).toBe(undefined);
    });
  });
});
