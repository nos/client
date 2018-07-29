import React from 'react';
import { mount } from 'enzyme';
import { merge } from 'lodash';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import { Browser } from 'browser';
import { EXTERNAL } from 'browser/values/browserValues';
import DAppContainer from 'browser/components/DAppContainer';
import Error from 'browser/components/Error';

const initialState = {
  [spunkyKey]: {
    auth: mockSpunkyLoaded({
      address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
      wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG'
    })
  },
  browser: {
    activeSessionId: 'tab-1',
    tabs: {
      'tab-1': {
        type: EXTERNAL,
        target: 'nos://nos.neo',
        title: 'Welcome to nOS',
        addressBarEntry: true,
        loading: false,
        requestCount: 1,
        errorCode: null,
        errorDescription: null
      },
      'tab-2': {
        type: EXTERNAL,
        target: 'nos://nos.neo/splash.html',
        title: 'nOS Splash',
        addressBarEntry: true,
        loading: false,
        requestCount: 1,
        errorCode: null,
        errorDescription: null
      }
    }
  }
};

const mountBrowser = (state = initialState) => {
  const store = createStore(state);
  return mount(provideStore(<Browser />, store));
};

describe('<Browser />', () => {
  it('renders all tabs', () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(DAppContainer)).toHaveLength(2);
  });

  it("only marks the activeSessionId's dapp as active", () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(DAppContainer).at(0).hasClass('active')).toBe(true);
    expect(wrapper.find(DAppContainer).at(1).hasClass('active')).toBe(false);
  });

  describe('when a tab has an error', () => {
    const state = merge({}, initialState, {
      browser: {
        tabs: {
          'tab-3': {
            type: EXTERNAL,
            target: 'protocol://error',
            title: 'nOS Error',
            addressBarEntry: true,
            loading: false,
            requestCount: 1,
            errorCode: -105,
            errorDescription: 'NAME_NOT_RESOLVED'
          }
        }
      }
    });

    it('hides the webview and shows an error', () => {
      const wrapper = mountBrowser(state);
      expect(wrapper.find(Error).length).toBe(1);
    });
  });
});
