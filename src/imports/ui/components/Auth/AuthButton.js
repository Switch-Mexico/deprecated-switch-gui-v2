import React from 'react';

export default class AuthButton extends React.Component {
  render() {
    return (
      <button disabled={this.props.isDisabled} onClick={this.props.onClick}>
        {this.props.buttonText}
      </button>
    );
  }
}
