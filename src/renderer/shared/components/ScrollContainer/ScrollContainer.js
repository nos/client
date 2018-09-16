import React from 'react';

const ScrollContainer = React.forwardRef((props, ref) => {
  return <div {...props} ref={ref} />;
});

export default ScrollContainer;
