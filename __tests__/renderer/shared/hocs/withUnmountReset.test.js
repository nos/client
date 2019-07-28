import React from 'react';
import { mount } from 'enzyme';

import { provideState } from 'testHelpers';

import withUnmountReset from 'shared/hocs/withUnmountReset';

describe('withUnmountReset', () => {
  const resetSpy = jest.fn(() => ({ type: 'FAKE_TEST_ACTION' }));
  const actions = { reset: resetSpy };

  // eslint-disable-next-line react/prop-types
  const WrappedComponent = withUnmountReset(actions)((props) => <div>{props.children}</div>);

  it('does not call reset while mounted', () => {
    mount(provideState(<WrappedComponent />));
    expect(actions.reset).not.toHaveBeenCalled();
  });

  it('calls reset when unmounted', () => {
    const wrapper = mount(provideState(<WrappedComponent />));
    wrapper.unmount();
    expect(actions.reset).toHaveBeenCalled();
  });

  it('passes props to wrapped component', () => {
    const wrapper = mount(provideState(<WrappedComponent>My content!</WrappedComponent>));
    expect(wrapper.text()).toContain('My content!');
  });
});
