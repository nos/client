import React from 'react';
import classNames from 'classnames';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { string, number } from 'prop-types';
import { times, reduce } from 'lodash';

import formatCurrency from 'account/util/formatCurrency';

import SectionLabel from '../SectionLabel';
import chartDataShape from '../../../../../shapes/chartDataShape';
import styles from './BreakdownChart.scss';

const COLORS = ['#5ebb46', '#b5d433', '#0b99e3'];

function reduceSum(data) {
  return reduce(data, (sum, datum) => sum + datum.value, 0);
}

export default class BreakdownChart extends React.PureComponent {
  static propTypes = {
    className: string,
    data: chartDataShape.isRequired,
    currency: string.isRequired,
    threshold: number.isRequired
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
    const { threshold } = this.props;
    const data = [...this.props.data];

    const totalSum = reduceSum(data);
    const filteredData = data.filter((item) => item.value / totalSum >= threshold);
    const restData = data.filter((item) => item.value / totalSum < threshold);

    const others = { symbol: 'OTHERS', value: reduceSum(restData) };
    if (others.value / totalSum < threshold) {
      return [...filteredData];
    } else {
      return [...filteredData, restData];
    }
  };

  formatValue = (value) => {
    return formatCurrency(value, this.props.currency);
  };
}
