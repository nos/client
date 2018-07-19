import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { progressValues } from 'spunky';

import { provideState } from 'testHelpers';

import Routes from 'root/components/App/Routes';
import { Login } from 'login';
import { Logout } from 'logout';
import { Browser } from 'browser';
import { EXTERNAL } from 'browser/values/browserValues';

const { LOADED } = progressValues;

const childContextTypes = { router: object };

const authenticatedState = {
  progress: LOADED,
  data: { wif: 'abc123', address: 'def456' }
};

const initialState = {
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
      const wrapper = mountPath('/logout', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Logout).exists()).toBe(true);
    });
  });

  describe('browser route', () => {
    itBehavesLikeAuthenticatedRoute('/browser');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/browser', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Browser).exists()).toBe(true);
    });
  });
});
