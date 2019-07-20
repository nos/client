import React from 'react';
import { wallet } from '@cityofzion/neon-js';
import { string, objectOf } from 'prop-types';
import { map } from 'lodash';

import TokenIcon from 'shared/components/TokenIcon';
import InvokeIcon from 'shared/images/browser/invoke.svg';
import formatAssets from 'shared/util/formatAssets';
import assetsShape from 'shared/shapes/assetsShape';
import balanceShape from 'account/shapes/balanceShape';

import styles from './styles.scss';

export default class InvocationPrompt extends React.PureComponent {
  static propTypes = {
    operation: string.isRequired,
    scriptHash: string.isRequired,
    assets: assetsShape.isRequired,
    balances: objectOf(balanceShape)
  };

  static defaultProps = {
    balances: {}
  };

  render() {
    const costs = this.getAssetCosts();

    return (
      <div className={styles.invocationPrompt}>
        {this.renderTitle(costs)}
        {this.renderIcons(costs)}
        {this.renderSubtitle(costs)}
        {this.renderBody(costs)}
      </div>
    );
  }

  renderTitle = (costs) => {
    const title = costs.length > 0 ? 'Transfer' : 'Permission Request';
    return <div className={styles.title}>{title}</div>;
  };

  renderSubtitle = (costs) => {
    if (costs.length === 0) {
      return null;
    }

    return <div className={styles.subtitle}>Transfer {costs.join(' and ')}</div>;
  };

  renderIcons = (costs) => {
    const icons =
      costs.length === 0 ? (
        <InvokeIcon />
      ) : (
        <React.Fragment>
          {map(this.getFormattedAssets(), (amount, asset) => (
            <TokenIcon
              key={asset}
              scriptHash={asset}
              symbol={this.getSymbol(asset)}
              icon={this.getIcon(asset)}
            />
          ))}
        </React.Fragment>
      );

    return <div className={styles.icons}>{icons}</div>;
  };

  renderBody = (costs) => {
    const prefix = costs.length > 0 ? null : 'Would you like ';
    const suffix = (
      <span>
        to perform operation <strong>&ldquo;{this.props.operation}&rdquo;</strong> on contract with
        address <strong>&ldquo;{this.getAddress()}&rdquo;</strong>?
      </span>
    );

    return (
      <div className={styles.body}>
        {prefix}
        {suffix}
      </div>
    );
  };

  getAddress = () => {
    return wallet.getAddressFromScriptHash(this.props.scriptHash);
  };

  getFormattedAssets = () => {
    return formatAssets(this.props.assets);
  };

  getAssetCosts = () => {
    return map(this.getFormattedAssets(), (amount, asset) => `${amount} ${this.getSymbol(asset)}`);
  };

  getSymbol = (scriptHash) => {
    const balances = this.props.balances || {};
    const { symbol } = balances[scriptHash] || {};
    return symbol;
  };

  getIcon = (scriptHash) => {
    const balances = this.props.balances || {};
    const { icon } = balances[scriptHash] || {};
    return icon;
  };
}
