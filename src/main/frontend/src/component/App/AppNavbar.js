import React, {Component} from 'react';
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
import {withRouter} from "react-router";

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            currentUser: undefined
        };

    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
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
        if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/') {
            const {currentUser, showModeratorBoard, showAdminBoard} = this.state; //TODO: O CO W TYCH IF-ACH CHODZI?

            if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/') {

                const {currentUser} = this.state;
            }

            return (
                <div>
                    <Navbar className="AppNavbar" dark expand="md">
                        <NavbarBrand href="/home">Strona Główna</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                {currentUser && (
                                    <NavItem>
                                        <NavLink href="/notifications">Powiadomienia</NavLink>
                                    </NavItem>
                                )}
                                {currentUser && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Magazyn Przedmiotów
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={event => window.location.href = '/itemstorage'}>
                                                Stany magazynowe
                                            </DropdownItem>
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
                                            <DropdownItem onClick={event => window.location.href = '/workers'}>
                                                Lista pracowników
                                            </DropdownItem>
                                            <DropdownItem>
                                                Harmonogramy
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/addworker'}>
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
                                            <DropdownItem
                                                onClick={event => window.location.href = '/addreservation'}>
                                                Stwórz nową
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/reservations'}>
                                                Wszystkie
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/guests'}>
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
                                            <DropdownItem onClick={event => window.location.href = '/rooms'}  >
                                                Wszystkie Pokoje
                                            </DropdownItem>
                                            <DropdownItem>
                                                Zgłoszenia
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/cleaning'} >
                                                Sprzątanie
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                                {currentUser && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Usługi
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={event => window.location.href = '/services'}>
                                                Wszystkie
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
        } else {
            return null;
        }
    }
}


export default withRouter(AppNavbar)