import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLocation } from '../../containers/App/selectors';

import Logo from '../../images/logo.svg';

import './styles/main.scss';

const insurancePaths = [
  {
    name: 'Risk Types',
    path: '/',
  },
];

class Header extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isOpen: false,
  };

  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  itemClass(p) {
    const { path } = p;
    const { location } = this.props;
    const { pathname } = location;
    const active = path === pathname ? 'active' : '';
    return ['navbar-item', active].join(' ');
  }

  render() {
    const { location } = this.props;
    const { isOpen } = this.state;
    const { pathname } = location;

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
                {
                  insurancePaths.map((path) => (
                    <NavItem className={this.itemClass(path)} key={path.name}>
                      <Link className="navbar-link" to="/">Risk Types</Link>
                    </NavItem>
                  ))
                }
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(Header);
