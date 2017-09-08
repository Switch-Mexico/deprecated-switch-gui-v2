
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class Buttons extends Component {
  constructor (props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>2021</Button>
          <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>2030</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Buttons;