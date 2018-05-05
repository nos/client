import React from 'react';

export default function withLayout(LayoutComponent) {
  return (Component) => (props) => (
    <LayoutComponent>
      <Component {...props} />
    </LayoutComponent>
  );
}
