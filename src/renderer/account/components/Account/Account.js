import React from "react";
import classNames from "classnames";
import { string, func } from "prop-types";

import Tabs from "shared/components/Tabs";
import PortfolioIcon from "shared/images/account/portfolio.svg";
import KeyMngmntIcon from "shared/images/account/keyManagement.svg";

import styles from "./Account.scss";

import Portfolio from "../Portfolio";
import Management from "../Management";

import IconTab from "../Portfolio/TransactionsPanel/HorizontalIconTab";

const TAB_PORTFOLIO = "portfolio";
const TAB_KEY_MANAGEMENT = "keyManagement";

const TABS = {
  [TAB_PORTFOLIO]: <IconTab renderIcon={PortfolioIcon}>Portfolio</IconTab>,
  [TAB_KEY_MANAGEMENT]: (
    <IconTab renderIcon={KeyMngmntIcon}>Key Management</IconTab>
  )
};

export default class Account extends React.PureComponent {
  static propTypes = {
    className: string
    // __progress__: string.isRequired,
    // showErrorToast: func.isRequired
  };

  static defaultProps = {
    className: null
  };

  state = {
    tab: TAB_PORTFOLIO
  };

  render() {
    const { __progress__, showErrorToast } = this.props;

    // if (__progress__ === 'FAILED') {
    //   showErrorToast('Loading is taking longer than expected. Check your nOS Network Settings.');
    // }

    return (
      <Tabs
        tabsClass={styles.tabs}
        tabClass={styles.tab}
        tabs={TABS}
        selectedTab={this.state.tab}
        renderTab={this.renderTab}
        onSelect={this.handleSelectTab}
        onScroll={this.handleScroll}
      />
    );
  }

  renderTab = id => {
    switch (id) {
      case TAB_PORTFOLIO:
        return <Portfolio />;
      case TAB_KEY_MANAGEMENT:
        return <Management />;
      default:
        throw new Error("Invalid tab.");
    }
  };

  handleSelectTab = tab => {
    this.setState({ tab });
  };
}
