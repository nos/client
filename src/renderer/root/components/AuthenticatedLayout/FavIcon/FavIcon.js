import React from 'react';
import classNames from 'classnames';
import { string, oneOf } from 'prop-types';

import DefaultIcon from 'shared/images/browser/favicon.svg';
import NosIcon from 'shared/images/browser/favicon-nos.svg';
import { INTERNAL, EXTERNAL } from 'browser/values/browserValues';

import styles from './FavIcon.scss';

export default function FavIcon(props) {
  const { icon, type, title } = props;
  const className = classNames(styles.favIcon, props.className);

  if (icon) {
    return <img className={className} src={icon} alt={title} />;
  } else if (type === INTERNAL) {
    return <NosIcon className={className} />;
  } else {
    return <DefaultIcon className={className} />;
  }
}

FavIcon.propTypes = {
  title: string.isRequired,
  type: oneOf([INTERNAL, EXTERNAL]).isRequired,
  icon: string
};
