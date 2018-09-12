import React from 'react';
import { mount } from 'enzyme';

import LastBlock from 'root/components/AuthenticatedLayout/LastBlock/LastBlock';
import block from 'fixtures/block.json';

describe('<LastBlock />', () => {
  const network = 'MainNet';

  it('renders the network', () => {
    const wrapper = mount(<LastBlock currentNetwork={network} />);
    expect(wrapper.find('.network').text()).toContain(network);
  });

  describe("when there's no error", () => {
    it('renders connected icon', () => {
      const wrapper = mount(<LastBlock currentNetwork={network} block={block} />);
      expect(wrapper.find('.icon.connected').exists()).toBe(true);
    });

    it('renders the block index', () => {
      const wrapper = mount(<LastBlock currentNetwork={network} block={block} />);
      expect(wrapper.find('.block .index').text()).toContain('2,719,341');
    });

    it('renders the block time', () => {
      const wrapper = mount(<LastBlock currentNetwork={network} block={block} />);
      expect(wrapper.find('.block .time').text()).toContain('1536709062');
    });
  });

  describe("when there's an error", () => {
    const error = 'Test error';

    describe('prior blocks fetched', () => {
      it('renders disconnected icon', () => {
        const wrapper = mount(<LastBlock currentNetwork={network} block={block} error={error} />);
        expect(wrapper.find('.icon.disconnected').exists()).toBe(true);
      });

      it('renders last available block index', () => {
        const wrapper = mount(<LastBlock currentNetwork={network} block={block} />);
        expect(wrapper.find('.block .index').text()).toContain('2,719,341');
      });

      it('renders last available block time', () => {
        const wrapper = mount(<LastBlock currentNetwork={network} block={block} />);
        expect(wrapper.find('.block .time').text()).toContain('1536709062');
      });
    });

    describe('no prior blocks fetched', () => {
      it('renders disconnected icon', () => {
        const wrapper = mount(<LastBlock currentNetwork={network} error={error} />);
        expect(wrapper.find('.icon.disconnected').exists()).toBe(true);
      });

      it('renders "Disconnected"', () => {
        const wrapper = mount(<LastBlock currentNetwork={network} error={error} />);
        expect(wrapper.find('.block').text()).toContain('Disconnected');
      });
    });
  });
});
