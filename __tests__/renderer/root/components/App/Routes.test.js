import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { provideState, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import Routes from 'root/components/App/Routes';
import { Login } from 'login';
import { Logout } from 'logout';
import { Browser } from 'browser';
import { EXTERNAL } from 'browser/values/browserValues';

const childContextTypes = { router: object };

const currentNetworkState = mockSpunkyLoaded('TestNet');
const authenticatedState = mockSpunkyLoaded({ wif: 'abc123', address: 'def456' });

const initialState = {
  [spunkyKey]: {
    currentNetwork: currentNetworkState
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
        requestCount: 1
      }
    }
  }
};

const mountPath = (pathname, state = {}) => {
  const context = createRouterContext({ location: { pathname } });

  return mount(provideState(<Routes />, { ...initialState, ...state }), {
    context,
    childContextTypes
  });
};

function itBehavesLikeAuthenticatedRoute(pathname) {
  it('redirects when unauthenticated', () => {
    const wrapper = mountPath(pathname);
    expect(wrapper.find(Redirect).prop('to')).toEqual('/login');
  });
}

describe('<Routes />', () => {
  it('renders login route', () => {
    const wrapper = mountPath('/login');
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('redirects to browser on invalid route', () => {
    const wrapper = mountPath('/index.html');
    expect(wrapper.find(Redirect).prop('to')).toEqual('/browser');
  });

  describe('logout route', () => {
    itBehavesLikeAuthenticatedRoute('/logout');

    it('does not redirect when authenticated', () => {
      const wrapper = mountPath('/logout', {
        [spunkyKey]: {
          currentNetwork: currentNetworkState,
          auth: authenticatedState
        }
      });
      expect(wrapper.find(Logout).exists()).toBe(true);
    });
  });

  describe('browser route', () => {
    itBehavesLikeAuthenticatedRoute('/browser');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/browser', {
        [spunkyKey]: {
          currentNetwork: currentNetworkState,
          auth: authenticatedState
        }
      });
      expect(wrapper.find(Browser).exists()).toBe(true);
    });
  });
});
