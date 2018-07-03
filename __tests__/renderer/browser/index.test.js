import React from 'react';
import { mount } from 'enzyme';
import { merge } from 'lodash';

import { provideStore, createStore } from 'testHelpers';
import { Browser } from 'browser';

import Session from 'browser/components/Session';
import Error from 'browser/components/Error';
import Tab from 'root/components/AuthenticatedLayout/Tab';

const initialState = {
  browser: {
    activeSessionId: 'tab-1',
    tabs: {
      'tab-1': {
        target: 'nos://nos.neo',
        title: 'Welcome to nOS',
        addressBarEntry: true,
        loading: false,
        requestCount: 1
      },
      'tab-2': {
        target: 'nos://nos.neo/splash.html',
        title: 'nOS Splash',
        addressBarEntry: true,
        loading: false,
        requestCount: 1
      }
    }
  }
};

const mountBrowser = (state = initialState) => {
  const store = createStore(state);
  return mount(provideStore(<Browser />, store));
};

const openTab = (wrapper, index) => {
  wrapper.find(Tab).at(index).prop('onClick')();
  wrapper.update();
};

describe('<Browser />', () => {
  it('renders all tabs', () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(Session)).toHaveLength(2);
  });

  it("only marks the activeSessionId's dapp as active", () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(Session).at(0).hasClass('active')).toBe(true);
    expect(wrapper.find(Session).at(1).hasClass('active')).toBe(false);
  });

  it('changes tabs', () => {
    const wrapper = mountBrowser();
    openTab(wrapper, 1);
    expect(wrapper.find(Tab).at(0).prop('active')).toBe(false);
    expect(wrapper.find(Tab).at(1).prop('active')).toBe(true);
  });

  it('does not remove the webview from the DOM when changing tabs', () => {
    const wrapper = mountBrowser();
    expect(wrapper.find('webview')).toHaveLength(2);
    openTab(wrapper, 1);
    expect(wrapper.find('webview')).toHaveLength(2);
  });

  describe('when a tab has an error', () => {
    const state = merge({}, initialState, {
      browser: {
        tabs: {
          'tab-3': {
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
