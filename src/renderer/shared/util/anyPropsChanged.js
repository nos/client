import { some, isEqual } from 'lodash';

export default function anyPropsChanged(prevProps, nextProps, keys, comparator = isEqual) {
  return some(keys, (key) => !comparator(prevProps[key], nextProps[key]));
}
