import React from 'react';
import { string, func } from 'prop-types';
import { map } from 'lodash';

import Select from 'shared/components/Forms/Select';
import GeneralIcon from 'shared/images/settings/general.svg';
import CURRENCIES from 'shared/values/currencies';

import SectionTitle from '../SectionTitle';
import SectionContent from '../SectionContent';
import styles from './GeneralSettings.scss';

export default class GeneralSettings extends React.PureComponent {
  static propTypes = {
    currency: string.isRequired,
    setCurrency: func.isRequired
  };

  componentWillUnmount() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }

  render() {
    return (
      <div className={styles.generalSettings}>
        <SectionTitle renderIcon={GeneralIcon}>
          General Settings
        </SectionTitle>

        <SectionContent>
          <Select
            className={styles.input}
            labelClass={styles.label}
            id="currency"
            label="Local Currency"
            value={this.props.currency}
            onChange={this.handleChangeCurrency}
          >
            {map(CURRENCIES, this.renderCurrencyOption)}
          </Select>
        </SectionContent>
      </div>
    );
  }

  renderCurrencyOption = (label, value) => {
    return (
      <option key={value} value={value}>
        {label} ({value})
      </option>
    );
  };

  handleChangeCurrency = (event) => {
    this.props.setCurrency(event.target.value);
  };
}
