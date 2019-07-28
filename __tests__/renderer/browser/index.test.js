import React from 'react';
import { mount } from 'enzyme';

import { provideStore, createStore } from 'testHelpers';

import { Browser } from 'browser';
import { EXTERNAL } from 'browser/values/browserValues';
import DAppContainer from 'browser/components/DAppContainer';

const initialState = {
  browser: {
    activeSessionId: 'tab-1',
    tabs: {
      'tab-1': {
        type: EXTERNAL,
        target: 'nos://nos.neo',
        title: 'Welcome to nOS',
        icon:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
        addressBarEntry: true,
        loading: false,
        requestCount: 1
      },
      'tab-2': {
        type: EXTERNAL,
        target: 'nos://nos.neo/splash.html',
        title: 'nOS Splash',
        icon: null,
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

describe('<Browser />', () => {
  it('renders all tabs', () => {
    const wrapper = mountBrowser();
    expect(wrapper.find(DAppContainer)).toHaveLength(2);
  });

  it("only marks the activeSessionId's dapp as active", () => {
    const wrapper = mountBrowser();
    expect(
      wrapper
        .find(DAppContainer)
        .at(0)
        .hasClass('active')
    ).toBe(true);
    expect(
      wrapper
        .find(DAppContainer)
        .at(1)
        .hasClass('active')
    ).toBe(false);
  });
});
