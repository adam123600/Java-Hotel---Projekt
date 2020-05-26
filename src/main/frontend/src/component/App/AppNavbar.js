import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';



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

      const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/home">Strona Główna</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
             {/* {showModeratorBoard && (
                <NavItem>
                  <NavLink href="/mod">Moderator Board</NavLink>
                </NavItem>
              )}
              {showAdminBoard && (
                <NavItem>
                  <NavLink href="/admin">Admin Board</NavLink>
                </NavItem>
              )}*/}
              {/*{currentUser && (
                <NavItem>
                  <NavLink href="/user">User</NavLink>
                </NavItem>
              )}
                {currentUser && (
                  <NavItem>
                      <NavLink href="/notifications">Powiadomienia</NavLink>
                </NavItem>
              )}*/}
              {currentUser && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Magazyn Przedmiotów
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={event =>  window.location.href='/itemstorage'}>
                        Stany magazynowe
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Zamówienia
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              )}
              {currentUser && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Pracownicy
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={event =>  window.location.href='/pracownicy'}>
                        Lista pracowników
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Harmonogramy
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Dodaj pracownika
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              )}
                {currentUser && (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Rezerwacje
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={event =>  window.location.href='/addreservation'}>
                          Stwórz nową
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Wszystkie
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={event =>  window.location.href='/guests'}>
                          Lista Gości
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
              )}
              {currentUser && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Pokoje
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={event =>  window.location.href='/rooms'}>
                        Wszystkie Pokoje
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Wyszukiwarka
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Zgłoszenia
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Sprzątanie
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              )}
            </Nav>
        
          {currentUser ? (
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {currentUser.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Mój Harmonogram
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Ustal dyspozycyjność
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="/login" onClick={this.logOut}>
                    Wyloguj
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