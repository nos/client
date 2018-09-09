import React from 'react';
import { func } from 'prop-types';

const withValidation = (validator) => (Component) => {
  return class extends React.PureComponent {
    static propTypes = {
      onReject: func.isRequired
    };

    state = {
      valid: false
    };

    componentDidMount() {
      try {
        validator(this.props);
      } catch (err) {
        this.props.onReject(err.message);
        return;
      }

      this.setState({ valid: true });
    }

    render() {
      if (!this.state.valid) {
        return null;
      }

      return <Component {...this.props} />;
    }
  };
};

export default withValidation;
