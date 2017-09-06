import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class Example extends React.Component {
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
      <div className="pills-right">
        <Nav pills>
          <NavItem>
            <NavLink replace to="/inputs/capacity">
              Capacity
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink replace to="/inputs/projectInfo">
              Project Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink disabled replace to="#">
              Energy Evolution
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
