import React, {Component} from 'react'
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import Navbar from 'react-bootstrap/lib/Navbar'
import Header from 'react-bootstrap/lib/NavbarHeader'
import Brand from 'react-bootstrap/lib/NavbarBrand'
import Collapse from 'react-bootstrap/lib/NavbarCollapse'
import Toggle from 'react-bootstrap/lib/NavbarToggle'

export default class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Header>
          <Brand>
            <a href="#">{this.props.companyName}</a>
          </Brand>
          <Toggle />
        </Header>
        <Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
