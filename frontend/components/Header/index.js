import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

import Logo from '../../images/logo.svg';

import './styles/main.scss';

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <header>
        <Container>
          <Navbar expand="md">
            <Link to="/">
              <ReactSVG src={Logo} svgStyle={{ width: '50px' }} />
            </Link>
            <NavbarToggler onClick={() => this.toggle()}>
              <FontAwesome className="hamburger" name="bars" />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="navbar-item">
                  <Link className="navbar-link" to="/">Risk Types</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

export default Header;
