import React from 'react';
import { mount } from 'enzyme';
import { noop, get } from 'lodash';
import { u, wallet } from '@cityofzion/neon-js';

import {
  provideStore,
  createStore,
  spunkyKey,
  mockSpunkyLoaded,
  addLoadedListener
} from 'testHelpers';

import makeSend from 'browser/components/RequestsProcessor/Send';
import makeSendActions, { ID as sendKey } from 'browser/actions/makeSendActions';
import { NEO, ASSETS } from 'shared/values/assets';

const sessionId = 'abc';
const requestId = '123';
const currentNetwork = 'MainNet';
const currentAddress = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';
const currentWif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
const amount = '1';
const receiverAddress = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      currentNetwork: mockSpunkyLoaded(currentNetwork),
      auth: mockSpunkyLoaded({ address: currentAddress, wif: currentWif }),
      fee: mockSpunkyLoaded('0.00000000')
    }
  });

describe('<Send />', () => {
  let store;

  beforeEach(() => {
    store = getStore();
  });

  const mockGetBalance = jest.fn(
    ({ net, address }) =>
      new wallet.Balance({
        net,
        address,
        assets: {
          [ASSETS[NEO].symbol]: {
            balance: new u.Fixed8(1),
            unspent: [
              {
                index: 0,
                txid: '9575e8bfe4bacabfee083c88a2175dcce71c56f01345b439001af632354c547b',
                value: new u.Fixed8(1)
              }
            ],
            spent: [],
            unconfirmed: []
          }
        }
      })
  );

  const mockSendAsset = jest.fn(({ net, address, wif }) => {
    if (net === currentNetwork && address === currentAddress && wif === currentWif) {
      return {
        response: {
          result: true,
          txid: '9a560de43649bc4671dcfc522c8a54d176cfd2bb34410e1ac976ddf1f150ab05'
        }
      };
    }
    return { response: { result: false } };
  });

  const mockInvoke = jest.fn(() => ({ response: { result: false } }));

  const mockGetRPCEndpoint = jest.fn((_net) => Promise.resolve('https://seed1.neo.org:443'));

  const sendActions = makeSendActions(
    sessionId,
    requestId,
    mockGetBalance,
    mockSendAsset,
    mockInvoke,
    mockGetRPCEndpoint
  );
  const Send = makeSend(sendActions);

  let callSpy;
  let onResolve;
  let onReject;

  const mountContainer = (props) => {
    return mount(provideStore(<Send {...props} />, store));
  };

  const addSendLoadedListener = (callback) => {
    addLoadedListener(store, `sessions.${sessionId}.${sendKey}-${requestId}`, callback);
  };

  beforeEach(() => {
    callSpy = jest.spyOn(sendActions, 'call');
    onResolve = jest.fn();
    onReject = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const defaultProps = {
    args: [{ asset: NEO, amount, receiver: receiverAddress }],
    src: 'nos://nos.neo',
    onResolve: noop,
    onReject: noop
  };

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

    it('initiates a send call', () => {
      expect(callSpy).toHaveBeenCalled();
    });

    it('renders nothing', () => {
      wrapper.update();
      expect(wrapper.find('NullLoader')).toHaveLength(1);
    });

    describe('on unmount', () => {
      const getSendState = () => {
        return get(store.getState(), `${spunkyKey}.sessions.${sessionId}.${sendKey}-${requestId}`);
      };

      it('removes the request from the session', () => {
        expect(getSendState()).not.toBe(undefined);
        wrapper.unmount();
        expect(getSendState()).toBe(undefined);
      });
    });
  });

  describe('when send fails', () => {
    let wrapper;

    beforeEach((done) => {
      mockSendAsset.mockImplementation(() => {
        throw new Error('Fake test error');
      });

      addSendLoadedListener(done);

      wrapper = mountContainer({ ...defaultProps, onResolve, onReject });
      wrapper
        .find('PromptComponent')
        .instance()
        .handleConfirm();
      wrapper.update(); // re-render after user confirmation
    });

    it('rejects', () => {
      wrapper.update(); // re-render after data fails to load
      expect(onReject).toHaveBeenCalledWith(
        `Could not send ${amount} ${NEO} to ${receiverAddress}: Fake test error`
      );
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

    it('does not initiate a send call', () => {
      expect(callSpy).not.toHaveBeenCalled();
    });
  });
});
