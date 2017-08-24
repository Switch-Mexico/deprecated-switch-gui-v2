import React from 'react';

export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: this.props.value };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isChecked: nextProps.value });
  }

  handleCheckboxChange = event => {
    this.setState({ isChecked: event.target.checked }, () => {
      if (this.state.isChecked) {
        this.props.isChecked();
      } else {
        this.props.noChecked();
      }
    });
  };

  render() {
    return (
      <div>
        <input
          type="checkbox"
          disabled={this.props.disabled}
          onChange={this.handleCheckboxChange}
          checked={this.state.isChecked}
        />
        {this.props.children}
      </div>
    );
  }
}
