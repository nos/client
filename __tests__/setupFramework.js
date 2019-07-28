import nock from 'nock';
import { getDisplayName } from 'recompose';

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(received, expect.arrayContaining([expect.objectContaining(argument)]));

    const message = pass
      ? () =>
          `expected ${this.utils.printReceived(
            received
          )} not to contain object ${this.utils.printExpected(argument)}`
      : () =>
          `expected ${this.utils.printReceived(
            received
          )} to contain object ${this.utils.printExpected(argument)}`;

    return { pass, message };
  },

  toForwardRefTo(received, argument) {
    const pass = received
      .find('ForwardRef')
      .find(argument)
      .exists();

    const message = pass
      ? () => `expected to not forward ref to ${this.utils.printExpected(getDisplayName(argument))}`
      : () => `expected to forward ref to ${this.utils.printExpected(getDisplayName(argument))}`;

    return { pass, message };
  }
});
