import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import AuthService from "../../service/AuthService";
import { withRouter } from "react-router";

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };

  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logOut() {
    AuthService.logout();
  }

  render() {

    if(this.props.location.pathname != '/login' && this.props.location.pathname != '/' ){

      const { currentUser } = this.state;

    return (
      <div>
        <Navbar className="AppNavbar" dark expand="md">
          <NavbarBrand href="/home">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {currentUser && (
                  <NavItem>
                      <NavLink href="/itemstorage">Magazyn Przedmiotów</NavLink>
                </NavItem>
              )}
              {currentUser && (
                  <NavItem>
                    <NavLink href="/pracownicy">Pracownicy</NavLink>
                  </NavItem>
              )}
                {currentUser && (
                  <NavItem>
                      <NavLink href="/notifications">Powiadomienia</NavLink>
                </NavItem>
              )}
            </Nav>
        
          {currentUser ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/profile">
                    {currentUser.username}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login" onClick={this.logOut}>
                    Log out
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/login">
                    Login
                  </NavLink>
                </NavItem>

                  <NavItem>
                    <NavLink href="/register">
                      Sign Up
                    </NavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Navbar>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default withRouter(AppNavbar)