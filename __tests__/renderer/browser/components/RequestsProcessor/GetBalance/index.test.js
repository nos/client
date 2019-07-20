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

import makeGetBalance from 'browser/components/RequestsProcessor/GetBalance';
import makeBalancesActions from 'browser/actions/makeBalancesActions';
import { NEO, GAS } from 'shared/values/assets';

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

describe('<GetBalance />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const mockGetBalances = jest.fn(() => ({
    [NEO]: { scriptHash: NEO, balance: '12', decimals: 0 },
    [GAS]: { scriptHash: GAS, balance: '1.00000008', decimals: 8 }
  }));
  const balancesActions = makeBalancesActions(sessionId, requestId, mockGetBalances);
  const GetBalance = makeGetBalance(balancesActions);

  const mountContainer = (props) => {
    return mount(provideStore(<GetBalance {...props} />, store));
  };

  const addBalancesLoadedListener = (callback) => {
    addLoadedListener(store, `sessions.${sessionId}.balances-${requestId}`, callback);
  };

  let callSpy;
  let onResolve;
  let onReject;

  beforeEach(() => {
    callSpy = jest.spyOn(balancesActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('with valid args', () => {
    const args = [{ address: 'ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW', asset: NEO }];
    const defaultProps = { args, onResolve: noop, onReject: noop };

    describe('on first render', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('initiates a balance data call', () => {
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

    describe('when balances data has loaded', () => {
      let wrapper;

      beforeEach((done) => {
        addBalancesLoadedListener(done);
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('resolves', () => {
        wrapper.update();
        expect(onResolve).toHaveBeenCalledWith('12');
        expect(onReject).not.toHaveBeenCalled();
      });
    });

    describe('when balances data has failed', () => {
      let wrapper;

      beforeEach((done) => {
        mockGetBalances.mockImplementationOnce(() => {
          throw new Error('Fake test error');
        });

        addBalancesLoadedListener(done);
        wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      });

      it('rejects', () => {
        wrapper.update();
        expect(onReject).toHaveBeenCalledWith(
          `Balance for account ${args[0].address} could not be retrieved: Fake test error`
        );
        expect(onResolve).not.toHaveBeenCalled();
      });
    });

    describe('on unmount', () => {
      let wrapper;

      const getBalancesState = () => {
        return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.balances-${requestId}`);
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

  describe('when address is not given', () => {
    const args = [{ asset: NEO }];
    const defaultProps = { args, onResolve: noop, onReject: noop };
    let wrapper;

    beforeEach((done) => {
      mockGetBalances.mockImplementationOnce(({ address }) => ({
        [NEO]: {
          scriptHash: NEO,
          balance: address === currentAddress ? '3' : '1',
          decimals: 0
        }
      }));

      addBalancesLoadedListener(done);
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('resolves with the currently authenticated address', () => {
      wrapper.update();
      expect(onResolve).toHaveBeenCalledWith('3');
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('with invalid asset', () => {
    const asset = 'bad-value';
    const args = [{ address: 'ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW', asset }];
    const defaultProps = { args, onResolve: noop, onReject: noop };
    let wrapper;

    beforeEach((done) => {
      addBalancesLoadedListener(done);
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('rejects', () => {
      wrapper.update();
      expect(onReject).toHaveBeenCalledWith(`Invalid asset hash: "${asset}"`);
      expect(onResolve).not.toHaveBeenCalled();
    });
  });
});
