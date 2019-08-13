import React from 'react';
import { mount } from 'enzyme';

import Tab from 'root/components/AuthenticatedLayout/Tab';
import FavIcon from 'shared/images/browser/favicon.svg';

describe('<Tab />', () => {
  const props = { title: 'nOS' };

  describe('active prop', () => {
    it('renders active class', () => {
      const wrapper = mount(<Tab {...props} active />);
      expect(wrapper.find('.active').exists()).toBe(true);
    });

    it('does not render active class', () => {
      const wrapper = mount(<Tab {...props} />);
      expect(wrapper.find('.active').exists()).toBe(false);
    });
  });

  describe('loading prop', () => {
    it('renders loading icon', () => {
      const wrapper = mount(<Tab {...props} loading />);
      expect(wrapper.find('.loading').exists()).toBe(true);
    });

    it('does not render loading icon', () => {
      const wrapper = mount(<Tab {...props} />);
      expect(wrapper.find('.loading').exists()).toBe(false);
    });
  });

  describe('icon prop', () => {
    it('renders spefied icon', () => {
      const url =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
      const wrapper = mount(<Tab {...props} icon={url} />);
      expect(wrapper.find(`img.icon[src="${url}"]`).exists()).toBe(true);
      expect(wrapper.find(FavIcon).exists()).toBe(false);
    });

    it('renders default icon', () => {
      const wrapper = mount(<Tab {...props} />);
      expect(wrapper.find('img.icon').exists()).toBe(false);
      expect(wrapper.find(FavIcon).exists()).toBe(true);
    });
  });

  it('triggers onClick handler', () => {
    const onClickSpy = jest.fn();
    const wrapper = mount(<Tab {...props} onClick={onClickSpy} />);
    wrapper.find('div.tab').simulate('click');
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('triggers onClose handler', () => {
    const onCloseSpy = jest.fn();
    const wrapper = mount(<Tab {...props} onClose={onCloseSpy} />);
    wrapper.find('button.close').simulate('click');
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
