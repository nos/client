import React from 'react';
import { mount } from 'enzyme';

import { createMockStore, provideStore } from 'testHelpers';

import withToast from 'shared/hocs/withToast';
import { ENQUEUE, TYPE_SUCCESS } from 'shared/actions/toastsActions';

describe('withToast', () => {
  const store = createMockStore();
  const type = TYPE_SUCCESS;
  const message = 'Signed in';

  const Component = (props) => (
    // eslint-disable-next-line react/prop-types, jsx-a11y/no-static-element-interactions
    <div onClick={() => props.showToast(message)}>content</div>
  );

  const WrappedComponent = withToast({ type })(Component);

  const mountContainer = (props = {}) => {
    return mount(provideStore(<WrappedComponent {...props} />, store));
  };

  it('provides a flash prop to the component', () => {
    const wrapper = mountContainer();
    expect(wrapper.find(Component).prop('showToast')).toBeInstanceOf(Function);
  });

  it('creates a flash action when called', () => {
    expect(store.getActions()).toHaveLength(0);

    const wrapper = mountContainer();
    wrapper.find(Component).simulate('click');

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainObject({
      type: ENQUEUE,
      payload: expect.objectContaining({ message, type })
    });
  });
});
