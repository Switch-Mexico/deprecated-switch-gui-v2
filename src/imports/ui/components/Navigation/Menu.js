import { NavLink } from 'react-router-dom';
import { push as MenuContainer } from 'react-burger-menu';

import Dropzone from './Dropzone';

const Menu = props =>
  <MenuContainer id={'scaleDown'} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
    <div key="1" className="logo">
      <img src={'./assets/img/logo-w.png'} alt="" />
    </div>
    <NavLink id="dashboard" className="menu-item" replace to="/information">
      Information
    </NavLink>
    <NavLink id="map" className="menu-item" replace to="/inputs">
      Inputs
    </NavLink>
    <NavLink id="chart" className="menu-item" replace to="/outputs">
      Outputs
    </NavLink>
    <Dropzone handleFile={props.handleFile} />
  </MenuContainer>;

export default Menu;
