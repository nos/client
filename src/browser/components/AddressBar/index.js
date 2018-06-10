import { withPropsOnChange } from 'recompose';

import AddressBar from './AddressBar';

export default withPropsOnChange(['query'], (props) => ({
  query: props.query.replace(/^(\w+:\/{2,}[\w@:]+)\/$/, '$1') // strip trailing slash from TLD
}))(AddressBar);
