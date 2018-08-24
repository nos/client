import React from 'react';
import { string, func } from 'prop-types';
import { map } from 'lodash';

import LabeledSelect from 'shared/components/Forms/LabeledSelect';
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

  render() {
    return (
      <div className={styles.generalSettings}>
        <SectionTitle renderIcon={GeneralIcon}>
          General Settings
        </SectionTitle>

        <SectionContent>
          <LabeledSelect
            className={styles.input}
            labelClass={styles.label}
            id="currency"
            label="Local Currency"
            value={this.props.currency}
            onChange={this.handleChangeCurrency}
          >
            {map(CURRENCIES, this.renderCurrencyOption)}
          </LabeledSelect>
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
