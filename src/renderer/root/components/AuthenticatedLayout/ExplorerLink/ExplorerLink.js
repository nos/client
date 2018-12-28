import React from 'react';

import { EXTERNAL } from 'browser/values/browserValues';

import TabLink from '../TabLink';

export default function ExplorerLink(props) {
  return <TabLink {...props} type={EXTERNAL} />;
}
