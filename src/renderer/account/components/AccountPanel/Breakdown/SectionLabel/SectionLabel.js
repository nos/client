import React from 'react';
import { number, string, shape } from 'prop-types';

import styles from './SectionLabel.scss';

const RADIAN = Math.PI / 180;

const payloadShape = shape({
  label: string.isRequired,
  value: number.isRequired
});

export default function SectionLabel(props) {
  const { cx, cy, midAngle, outerRadius, percent, payload: { label } } = props;
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g className={styles.sectionLabel}>
      <text x={x} y={y - 10} className={styles.label} textAnchor="start" dominantBaseline="central">
        {label}
      </text>
      <text x={x} y={y + 10} className={styles.percent} textAnchor="start" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
}

SectionLabel.propTypes = {
  cx: number.isRequired,
  cy: number.isRequired,
  midAngle: number.isRequired,
  outerRadius: number.isRequired,
  percent: number.isRequired,
  payload: payloadShape.isRequired
};
