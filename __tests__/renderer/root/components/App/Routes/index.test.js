import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import Routes from 'root/components/App/Routes';
import Tab from 'root/components/AuthenticatedLayout/Tab';
import { EXTERNAL } from 'browser/values/browserValues';

const initialState = {
  [spunkyKey]: {
    currentNetwork: mockSpunkyLoaded('MainNet'),
    auth: mockSpunkyLoaded({
      address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
      wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG'
    })
  },
  browser: {
    currentNetwork: 'MainNet',
    activeSessionId: 'tab-1',
    tabs: {
      'tab-1': {
        type: EXTERNAL,
        target: 'nos://nos.neo',
        title: 'Welcome to nOS',
        addressBarEntry: true,
        loading: false,
        requestCount: 1
      },
      'tab-2': {
        type: EXTERNAL,
        target: 'nos://nos.neo/splash.html',
        title: 'nOS Splash',
        addressBarEntry: true,
        loading: false,
        requestCount: 1
      }
    }
  }
};

const mountRoutes = (currentState = {}) => {
  const store = createStore({ ...initialState, ...currentState });
  return mount(
    provideStore(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>,
      store
    )
  );
};

const openTab = (wrapper, index) => {
  wrapper
    .find(Tab)
    .at(index)
    .prop('onClick')();
  wrapper.update();
};

describe('<Routes />', () => {
  it('changes tabs', () => {
    const wrapper = mountRoutes();
    openTab(wrapper, 1);
    expect(
      wrapper
        .find(Tab)
        .at(0)
        .prop('active')
    ).toBe(false);
    expect(
      wrapper
        .find(Tab)
        .at(1)
        .prop('active')
    ).toBe(true);
  });

  it('does not remove the webview from the DOM when changing tabs', () => {
    const wrapper = mountRoutes();
    expect(wrapper.find('webview')).toHaveLength(2);
    openTab(wrapper, 1);
    expect(wrapper.find('webview')).toHaveLength(2);
  });
});
