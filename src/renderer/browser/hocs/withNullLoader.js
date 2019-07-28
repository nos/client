import { withProgressComponents, progressValues } from 'spunky';

const { LOADING } = progressValues;

function NullLoader() {
  return null;
}

export default function withNullLoader(actions, options = {}) {
  return withProgressComponents(
    actions,
    {
      [LOADING]: NullLoader
    },
    options
  );
}
