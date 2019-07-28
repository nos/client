import React from 'react';
import { string, func } from 'prop-types';
import { map } from 'lodash';

import Label from 'shared/components/Forms/Label';
import LiveUpdateInput from 'shared/components/Forms/LiveUpdateInput';
import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import GeneralIcon from 'shared/images/settings/general.svg';
import CURRENCIES from 'shared/values/currencies';

import SectionTitle from '../SectionTitle';
import SectionContent from '../SectionContent';
import styles from './GeneralSettings.scss';

export default class GeneralSettings extends React.PureComponent {
  static propTypes = {
    currency: string.isRequired,
    fee: string.isRequired,
    setCurrency: func.isRequired,
    setFee: func.isRequired
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
            items={this.getCurrencyItems()}
            onChange={this.handleChangeCurrency}
          />

          <Label className={styles.label} htmlFor="fee" label="Default GAS Priority Fee">
            <LiveUpdateInput
              id="fee"
              className={styles.input}
              defaultValue={this.props.fee}
              onChange={this.props.setFee}
            />
          </Label>
        </SectionContent>
      </div>
    );
  }

  handleChangeCurrency = (currency) => {
    this.props.setCurrency(currency);
  }

  getCurrencyItems = () => {
    return map(CURRENCIES, (label, value) => ({ label: `${label} (${value})`, value }));
  }
}
