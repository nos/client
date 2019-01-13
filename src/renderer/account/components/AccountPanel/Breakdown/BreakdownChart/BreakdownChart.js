import React from 'react';
import classNames from 'classnames';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { string } from 'prop-types';
import { times, reduce } from 'lodash';

import formatCurrency from 'account/util/formatCurrency';

import SectionLabel from '../SectionLabel';
import chartDataShape from '../../../../shapes/chartDataShape';
import styles from './BreakdownChart.scss';

const COLORS = ['#5ebb46', '#b5d433', '#0b99e3'];

function reduceSum(data) {
  return reduce(data, (sum, datum) => sum + datum.value, 0);
}

export default class BreakdownChart extends React.PureComponent {
  static propTypes = {
    className: string,
    data: chartDataShape.isRequired,
    currency: string.isRequired
  };

  static defaultProps = {
    className: null
  };

  render() {
    const data = this.getData();

    return (
      <ResponsiveContainer
        width="100%"
        className={classNames(styles.breakdownChart, this.props.className)}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="symbol"
            innerRadius="50%"
            outerRadius="65%"
            startAngle={90}
            endAngle={-270}
            label={SectionLabel}
            labelLine={false}
            isAnimationActive={false}
          >
            {times(data.length, (index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index]}
              />
            ))}
          </Pie>
          <Tooltip formatter={this.formatValue} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  getData = () => {
    const data = [...this.props.data];

    if (data.length <= 3) {
      return data;
    }

    const spliced = [...data.splice(0, 2)];
    const main = reduceSum(spliced);
    const others = { symbol: 'OTHERS', value: reduceSum(data) };
    if (others.value / main < 0.02) {
      return [...spliced];
    } else {
      return [...spliced, others];
    }
  };

  formatValue = (value) => {
    return formatCurrency(value, this.props.currency);
  };
}
