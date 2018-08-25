import React from 'react';
import { shallow } from 'enzyme';

import AccountDetails from 'register/components/AccountDetails/AccountDetails';

describe('<AccountDetails />', () => {
  const account = {
    address: 'my-address',
    key: 'my-key',
    encryptedKey: 'my-encrypted-key',
    passphrase: 'my-passphrase'
  };
  let wrapper;

  const findDatum = (label) => {
    return wrapper.find('Connect(AccountDatum)').findWhere((node) => node.prop('label') === label);
  };

  beforeEach(() => {
    wrapper = shallow(<AccountDetails account={account} />);
  });

  it('renders address', () => {
    expect(findDatum('Address').prop('value')).toEqual(account.address);
  });

  it('renders private key', () => {
    expect(findDatum('Private Key').prop('value')).toEqual(account.key);
  });

  it('renders encrypted key', () => {
    expect(findDatum('Encrypted Key').prop('value')).toEqual(account.encryptedKey);
  });

  it('does not render passphrase', () => {
    expect(findDatum('Passphrase')).toHaveLength(0);
  });
});
