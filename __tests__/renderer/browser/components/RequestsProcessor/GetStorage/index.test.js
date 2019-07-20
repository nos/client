import React from 'react';
import { mount } from 'enzyme';
import { noop, get } from 'lodash';

import {
  provideStore,
  createStore,
  spunkyKey,
  mockSpunkyLoaded,
  addLoadedListener
} from 'testHelpers';

import makeGetStorage from 'browser/components/RequestsProcessor/GetStorage';
import makeStorageActions from 'browser/actions/makeStorageActions';

const sessionId = 'abc';
const requestId = '123';
const currentAddress = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      currentNetwork: mockSpunkyLoaded('MainNet'),
      auth: mockSpunkyLoaded({
        wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG',
        address: currentAddress
      })
    }
  });

describe('<GetStorage />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const mockScriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
  const mockGetStorage = jest.fn(({ net, scriptHash, key }) => {
    return net === 'MainNet' && scriptHash === mockScriptHash && key === 'foo'
      ? 'foo response'
      : 'bar response';
  });
  const storageActions = makeStorageActions(sessionId, requestId, mockGetStorage);
  const GetStorage = makeGetStorage(storageActions);

  const mountContainer = (props) => {
    return mount(provideStore(<GetStorage {...props} />, store));
  };

  const addStorageLoadedListener = (callback) => {
    addLoadedListener(store, `sessions.${sessionId}.storage-${requestId}`, callback);
  };

  let callSpy;
  let onResolve;
  let onReject;

  beforeEach(() => {
    callSpy = jest.spyOn(storageActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('with valid args', () => {
    const args = [{ scriptHash: mockScriptHash, key: 'foo' }];
    const defaultProps = { args, onResolve: noop, onReject: noop };

    describe('on first render', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('initiates a storage data call', () => {
        expect(callSpy).toHaveBeenCalled();
      });

      it('renders nothing', () => {
        expect(wrapper.find('NullLoader')).toHaveLength(1);
      });

      it('does not resolve or reject', () => {
        expect(onResolve).not.toHaveBeenCalled();
        expect(onReject).not.toHaveBeenCalled();
      });
    });

    describe('when storage data has loaded', () => {
      let wrapper;

      beforeEach((done) => {
        addStorageLoadedListener(done);
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('resolves', () => {
        wrapper.update();
        expect(onResolve).toHaveBeenCalledWith('foo response');
        expect(onReject).not.toHaveBeenCalled();
      });
    });

    describe('when balances data has failed', () => {
      let wrapper;

      beforeEach((done) => {
        mockGetStorage.mockImplementationOnce(() => {
          throw new Error('Fake test error');
        });

        addStorageLoadedListener(done);
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('rejects', () => {
        wrapper.update();
        expect(onReject).toHaveBeenCalledWith(
          `Retrieving storage failed for key "foo" on ${mockScriptHash}: Fake test error`
        );
        expect(onResolve).not.toHaveBeenCalled();
      });
    });

    describe('on unmount', () => {
      let wrapper;

      const getBalancesState = () => {
        return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.storage-${requestId}`);
      };

      beforeEach(() => {
        wrapper = mountContainer(defaultProps);
      });

      it('removes the request from the session', () => {
        expect(getBalancesState()).not.toBe(undefined);
        wrapper.unmount();
        expect(getBalancesState()).toBe(undefined);
      });
    });
  });
});
