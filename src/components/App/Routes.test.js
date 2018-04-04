import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { progressValues } from 'spunky';

import Routes from './Routes';
import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import DAppContainer from '../DAppContainer';
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

  it('redirects to root on invalid route', () => {
    const wrapper = mountPath('/index.html');
    expect(wrapper.find(Redirect).prop('to')).toEqual('/');
  });

  describe('root route', () => {
    itBehavesLikeAuthenticatedRoute('/');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Home).exists()).toBe(true);
    });
  });

  describe('logout route', () => {
    itBehavesLikeAuthenticatedRoute('/logout');

    it('does not redirect when authenticated', () => {
      const wrapper = mountPath('/logout', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(Logout).exists()).toBe(true);
    });
  });

  describe('dapp route', () => {
    itBehavesLikeAuthenticatedRoute('/dapp');

    it('renders when authenticated', () => {
      const wrapper = mountPath('/dapp', { spunky: { auth: authenticatedState } });
      expect(wrapper.find(DAppContainer).exists()).toBe(true);
    });
  });
});
