import React from 'react';
import { mount } from 'enzyme';

import AccountDatum from 'register/components/AccountDetails/AccountDatum/AccountDatum';

describe('<AccountDatum />', () => {
  const mountContainer = (props = {}) => {
    return mount(<AccountDatum label="Address" value="abc123" {...props} />);
  };

  it('renders the label', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.label').text()).toContain('Address');
  });

  it('renders the value', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.value').text()).toContain('abc123');
  });

  it('calls showInfoToast prop when copy icon is clicked', () => {
    const showToastSpy = jest.fn();
    const wrapper = mountContainer({ showInfoToast: showToastSpy });
    wrapper.find('Icon').simulate('click');
    expect(showToastSpy).toHaveBeenCalledWith('Address copied to clipboard.');
  });
});
