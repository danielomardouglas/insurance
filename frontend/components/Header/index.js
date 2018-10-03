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

import getToken from '../../utils/token';

import Logo from '../../images/logo.svg';

import './styles/main.scss';

const insurancePaths = [
  {
    name: 'Risk Types',
    path: '/',
    private: false,
    auth: false,
  },
  {
    name: 'Logout',
    path: '/logout',
    private: true,
    auth: false,
  },
  {
    name: 'Authenticate',
    path: '/auth',
    private: false,
    auth: true,
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
                {
                  insurancePaths.map((path) => (
                    <NavItem className={this.itemClass(path)} key={path.name}>
                      {
                        !path.private && !path.auth ? (
                          <Link className="navbar-link" to={path.path}>{path.name}</Link>
                        ) : null
                      }
                      {
                        path.private && getToken() ? (
                          <Link className="navbar-link" to={path.path}>{path.name}</Link>
                        ) : null
                      }
                      {
                        path.auth && !getToken() ? (
                          <Link className="navbar-link" to={path.path}>{path.name}</Link>
                        ) : null
                      }
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
