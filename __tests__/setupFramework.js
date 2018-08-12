expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(
      received,
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    );

    const message = pass
      ? () => `expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`
      : () => `expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`;

    return { pass, message };
  }
});
