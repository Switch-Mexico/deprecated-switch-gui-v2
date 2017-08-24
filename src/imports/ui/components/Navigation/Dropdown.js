import { NavLink } from 'react-router-dom';
import { push as MenuContainer } from 'react-burger-menu';
import { Menu, Dropdown, Label, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const HeaderBar = ({ actions }) =>
  <Menu.Menu position="right">
    <Dropdown item icon="user">
      <Dropdown.Menu>
        <NavLink id="chart" className="menu-item" to="/query">
          <Dropdown.Item>
            <span>Profil</span>
          </Dropdown.Item>
        </NavLink>
        <NavLink id="chart" className="menu-item" to="/mutation">
          <Dropdown.Item>
            <span>Profil</span>
          </Dropdown.Item>
        </NavLink>
        <Dropdown.Item>Abmelden</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>;

export default HeaderBar;
