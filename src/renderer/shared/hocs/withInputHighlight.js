import React from 'react';
import whatInput from 'what-input';
import { wrapDisplayName } from 'recompose';

export default function withInputHighlight(Component) {
  return class extends React.Component {
    static displayName = wrapDisplayName(Component, 'withInputHighlight');

    render() {
      return (
        <Component
          {...this.props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSelect={this.handleSelect}
        />
      );
    }

    handleFocus = () => {
      this.focusing = whatInput.ask() === 'mouse';
    }

    handleBlur = () => {
      this.focusing = false;
      getSelection().empty();
    }

    handleSelect = (event) => {
      if (this.focusing && getSelection().toString() === '') {
        this.focusing = false;
        event.target.select();
      }
    }
  };
}
