import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Dropdown from './Dropdown';

export default class InformationHeader extends React.Component {
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
            <Dropdown />
          </NavItem>
        </Nav>
      </div>
    );
  }
}
