import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { progressValues } from 'spunky';

import Routes from '../../../src/components/App/Routes';
import Account from '../../../src/components/Account';
import Login from '../../../src/components/Login';
import Logout from '../../../src/components/Logout';
import Browser from '../../../src/components/Browser';
import { provideState } from '../../testHelpers';

const { LOADED } = progressValues;

const childContextTypes = { router: object };

const authenticatedState = {
  progress: LOADED,
  data: { wif: 'abc123', address: 'def456' }
};

const mountPath = (pathname, state = {}) => {
  const context = createRouterContext({ location: { pathname } });
  return mount(provideState(<Routes />, state), { context, childContextTypes });
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

  describe('account route', () => {
    itBehavesLikeAuthenticatedRoute('/account');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/account', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Account).exists()).toBe(true);
    });
  });

  describe('logout route', () => {
    itBehavesLikeAuthenticatedRoute('/logout');

    it('does not redirect when authenticated', () => {
      const wrapper = mountPath('/logout', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Logout).exists()).toBe(true);
    });
  });

  describe('browser route', () => {
    itBehavesLikeAuthenticatedRoute('/browser/nos.neo');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/browser/nos.neo', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Browser).exists()).toBe(true);
    });
  });
});
