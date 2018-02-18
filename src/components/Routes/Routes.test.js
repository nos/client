import React from 'react';
import createRouterContext from 'react-router-test-context';
import { mount } from 'enzyme';
import { object } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Routes from './Routes';
import Home from '../Home';
import Login from '../Login';
import DAppExample from '../DAppExample';

describe('<Routes />', () => {
  const childContextTypes = { router: object };

  it('renders root route', () => {
    const context = createRouterContext({ location: { pathname: '/' } });
    const wrapper = mount(<Routes />, { context, childContextTypes });
    expect(wrapper.find(Home).exists()).toBe(true);
  });

  it('renders login route', () => {
    const context = createRouterContext({ location: { pathname: '/login' } });
    const wrapper = mount(<Routes />, { context, childContextTypes });
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('renders example dapp route', () => {
    const context = createRouterContext({ location: { pathname: '/dapp' } });
    const wrapper = mount(<Routes />, { context, childContextTypes });
    expect(wrapper.find(DAppExample).exists()).toBe(true);
  });

  it('redirects to root on invalid route', () => {
    const context = createRouterContext({ location: { pathname: '/index.html' } });
    const wrapper = mount(<Routes />, { context, childContextTypes });
    expect(wrapper.find(Redirect).prop('to')).toEqual('/');
  });
});
