import React from 'react';
import { string, func } from 'prop-types';
import { map } from 'lodash';

import Label from 'shared/components/Forms/Label';
import LabeledInput from 'shared/components/Forms/LabeledInput/LabeledInput';
import LiveUpdateInput from 'shared/components/Forms/LiveUpdateInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import GeneralIcon from 'shared/images/settings/general.svg';
import CURRENCIES from 'shared/values/currencies';
import { THEMES } from 'shared/values/themes';

import SectionTitle from '../SectionTitle';
import SectionContent from '../SectionContent';
import styles from './AdvancedSettings.scss';

export default class AdvancedSettings extends React.PureComponent {
  static propTypes = {
    currency: string.isRequired,
    fee: string.isRequired,
    theme: string.isRequired,
    setCurrency: func.isRequired,
    setFee: func.isRequired,
    setTheme: func.isRequired
  };

  render() {
    return (
      <div className={styles.generalSettings}>
        <SectionTitle renderIcon={GeneralIcon}>Advanced</SectionTitle>

        <SectionContent>
          <LabeledInput
            type="checkbox"
            className={styles.toggle}
            labelClass={styles.label}
            id="theme"
            label="Enable Dark Theme"
            value={this.props.theme}
            onChange={this.toggleTheme}
            defaultChecked={this.props.theme === THEMES.DARK}
          />
        </SectionContent>
      </div>
    );
  }

  handleChangeCurrency = (currency) => {
    this.props.setCurrency(currency);
  };

  toggleTheme = () => {
    const { theme } = this.props;
    const newTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    this.props.setTheme(newTheme);
  };

  getCurrencyItems = () => {
    return map(CURRENCIES, (label, value) => ({
      label: `${label} (${value})`,
      value
    }));
  };
}
