import { each, pull } from 'lodash';

class ScrollSpy {
  subscriptions = [];

  publish = (...args) => {
    each(this.subscriptions, (handler) => handler(...args));
  };

  subscribe = (handler) => {
    this.subscriptions.push(handler);
  };

  unsubscribe = (handler) => {
    pull(this.subscriptions, handler);
  };
}

export default ScrollSpy;

export const defaultScrollSpy = new ScrollSpy();
