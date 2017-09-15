import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class D extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>Evolution</DropdownToggle>
        <DropdownMenu>
          <NavLink replace to="/">
            <DropdownItem>Capacity</DropdownItem>
          </NavLink>
          <DropdownItem divider />
          <NavLink replace to="/information/generation">
            <DropdownItem>Generation</DropdownItem>
          </NavLink>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
