import React from 'react';

const withForwardedRef = (propName = 'forwardedRef') => (Component) => {
  return React.forwardRef((props, ref) => {
    const refProps = { [propName]: ref };
    return <Component {...props} {...refProps} />;
  });
};

export default withForwardedRef;
