import React from 'react';
import classNames from 'classnames';
import { string } from 'prop-types';

import NeoIcon from 'shared/images/tokens/neo.svg';
import GasIcon from 'shared/images/tokens/gas.svg';
import NosIcon from 'shared/images/tokens/nos.svg';
import { NEO, GAS, NOS } from 'shared/values/assets';

import styles from './TokenIcon.scss';

export default function TokenIcon(props) {
  const { image, symbol, scriptHash } = props;
  const className = classNames(styles.tokenIcon, props.className);

  if (scriptHash === NOS) {
    return <NosIcon className={className} />;
  }

  if (image) {
    return <img className={className} src={image} alt={symbol || scriptHash} />;
  }

  if (scriptHash === NEO) {
    return <NeoIcon className={className} />;
  }

  if (scriptHash === GAS) {
    return <GasIcon className={className} />;
  }

  // TODO: generic token design
  return <NosIcon className={className} />;
}

TokenIcon.propTypes = {
  className: string,
  image: string,
  symbol: string,
  scriptHash: string.isRequired
};

TokenIcon.defaultProps = {
  className: null,
  image: null,
  symbol: null
};
