/* eslint-disable no-console */
import React, { unstable_Profiler as Profiler } from 'react';

function handleRender(id, phase, actualTime, baseTime, _startTime, _commitTime) {
  console.log(`[${id}] [${phase}] Actual time: ${actualTime}; Base time: ${baseTime}`);
}

const withProfiler = (Component) => (props) => {
  return (
    <Profiler id="root" onRender={handleRender}>
      <Component {...props} />
    </Profiler>
  );
};

export default withProfiler;
