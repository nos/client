import React from 'react';
import { mount } from 'enzyme';
import { noop, get } from 'lodash';
import { progressValues } from 'spunky';
import { wallet } from '@cityofzion/neon-js';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import makeEncrypt from 'browser/components/RequestsProcessor/Encrypt';
import makeEncryptActions from 'browser/actions/makeEncryptActions';

const sessionId = 'abc';
const requestId = '123';

const wif = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr';
const account = new wallet.Account(wif);

const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
const mac = '170d03c25d49c7c03c8e1515a316f94fafb52feac73c46196525813883d64596';
const data = 'some text';
const encrypted = '16f55cabb8b9c87a85af3232f30c0a07';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      auth: mockSpunkyLoaded({ address: account.address, wif: account.WIF })
    }
  });

describe('<Encrypt />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const mockIVProvider = jest.fn(() => Buffer.from(iv, 'hex'));
  const encryptActions = makeEncryptActions(sessionId, requestId, mockIVProvider);
  const Encrypt = makeEncrypt(encryptActions);

  const mountContainer = (props) => {
    return mount(provideStore(<Encrypt {...props} />, store));
  };

  const addEncryptLoadedListener = (done) => {
    const unsubscribe = store.subscribe(() => {
      const key = `${spunkyKey}.sessions.${sessionId}.encrypt-${requestId}.progress`;
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
    callSpy = jest.spyOn(encryptActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  describe('with valid args', () => {
    const recipientPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
    const args = [{ recipientPublicKey, data }];
    const defaultProps = { args, onResolve: noop, onReject: noop };

    describe('on first render', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('initiates an encrypt data call', () => {
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

    describe('when encrypted data has loaded', () => {
      let wrapper;

      beforeEach((done) => {
        addEncryptLoadedListener(done);
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('resolves', () => {
        wrapper.update();
        expect(onResolve).toHaveBeenCalledWith({ iv, mac, data: encrypted });
        expect(onReject).not.toHaveBeenCalled();
      });
    });

    describe('on unmount', () => {
      let wrapper;

      const getEncryptState = () => {
        return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.encrypt-${requestId}`);
      };

      beforeEach(() => {
        wrapper = mountContainer(defaultProps);
      });

      it('removes the request from the session', () => {
        expect(getEncryptState()).not.toBe(undefined);
        wrapper.unmount();
        expect(getEncryptState()).toBe(undefined);
      });
    });
  });

  describe('with invalid args', () => {
    const recipientPublicKey = '111111111111111111111111111111111111111111111111111111111111111111';
    const args = [{ recipientPublicKey, data }];
    const defaultProps = { args, onResolve: noop, onReject: noop };

    let wrapper;

    beforeEach((done) => {
      addEncryptLoadedListener(done);
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('rejects', () => {
      wrapper.update();
      expect(onReject).toHaveBeenCalledWith('Encryption failed.');
      expect(onResolve).not.toHaveBeenCalled();
    });
  });
});
