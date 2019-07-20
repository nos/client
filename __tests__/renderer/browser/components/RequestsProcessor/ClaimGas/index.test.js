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

import makeClaimGas from 'browser/components/RequestsProcessor/ClaimGas';
import makeClaimActions, { ID as claimKey } from 'browser/actions/makeClaimActions';

const sessionId = 'abc';
const requestId = '123';
const currentNetwork = 'MainNet';
const currentAddress = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';
const currentWif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      currentNetwork: mockSpunkyLoaded(currentNetwork),
      auth: mockSpunkyLoaded({ address: currentAddress, wif: currentWif })
    }
  });

describe('<ClaimGas />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const mockClaim = jest.fn(({ net, address, wif }) => {
    if (net === currentNetwork && address === currentAddress && wif === currentWif) {
      return '9a560de43649bc4671dcfc522c8a54d176cfd2bb34410e1ac976ddf1f150ab05';
    }
    return null;
  });

  const claimActions = makeClaimActions(sessionId, requestId, mockClaim);
  const ClaimGas = makeClaimGas(claimActions);

  let callSpy;
  let onResolve;
  let onReject;

  const mountContainer = (props) => {
    return mount(provideStore(<ClaimGas {...props} />, store));
  };

  const addClaimLoadedListener = (callback) => {
    addLoadedListener(store, `sessions.${sessionId}.${claimKey}-${requestId}`, callback);
  };

  beforeEach(() => {
    callSpy = jest.spyOn(claimActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const defaultProps = { args: [], src: 'nos://nos.neo', onResolve: noop, onReject: noop };

  describe('on first render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
    });

    it('prompts for user confirmation', () => {
      expect(wrapper.find('PromptComponent')).toHaveLength(1);
    });

    it('does not resolve or reject', () => {
      expect(onResolve).not.toHaveBeenCalled();
      expect(onReject).not.toHaveBeenCalled();
    });
  });

  describe('when user accepts the prompt', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      wrapper
        .find('PromptComponent')
        .instance()
        .handleConfirm();
    });

    it('initiates a claim call', () => {
      expect(callSpy).toHaveBeenCalled();
    });

    it('renders nothing', () => {
      wrapper.update();
      expect(wrapper.find('NullLoader')).toHaveLength(1);
    });

    describe('on unmount', () => {
      const getClaimState = () => {
        return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.${claimKey}-${requestId}`);
      };

      it('removes the request from the session', () => {
        expect(getClaimState()).not.toBe(undefined);
        wrapper.unmount();
        expect(getClaimState()).toBe(undefined);
      });
    });
  });

  describe('when claim fails', () => {
    let wrapper;

    beforeEach((done) => {
      mockClaim.mockImplementation(() => {
        throw new Error('Fake test error');
      });

      addClaimLoadedListener(done);

      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      wrapper
        .find('PromptComponent')
        .instance()
        .handleConfirm();
      wrapper.update(); // re-render after user confirmation
    });

    it('rejects', () => {
      wrapper.update(); // re-render after data fails to load
      expect(onReject).toHaveBeenCalledWith('Could not claim GAS: Fake test error');
      expect(onResolve).not.toHaveBeenCalled();
    });
  });

  describe('when user rejects the prompt', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      wrapper
        .find('PromptComponent')
        .instance()
        .handleCancel();
      wrapper.update(); // re-render after user cancellation
    });

    it('does not initiate a claim call', () => {
      expect(callSpy).not.toHaveBeenCalled();
    });
  });
});
