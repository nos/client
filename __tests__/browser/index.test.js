import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore } from 'testHelpers';
import { Browser } from 'browser';

import DAppContainer from 'browser/components/DAppContainer';
import Tab from 'browser/components/Tab';

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
    expect(wrapper.find(DAppContainer).length).toBe(2);
  });

  it("only marks the activeSessionId's dapp as active", () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(DAppContainer).at(0).prop('active')).toBe(true);
    expect(wrapper.find(DAppContainer).at(1).prop('active')).toBe(false);
  });

  it('changes tabs', () => {
    const wrapper = mountBrowser();
    openTab(wrapper, 1);
    expect(wrapper.find(Tab).at(0).prop('active')).toBe(false);
    expect(wrapper.find(Tab).at(1).prop('active')).toBe(true);
  });

  it('does not remove the webview from the DOM when changing tabs', () => {
    const wrapper = mountBrowser();
    expect(wrapper.find('webview').length).toBe(2);
    openTab(wrapper, 1);
    expect(wrapper.find('webview').length).toBe(2);
  });
});
