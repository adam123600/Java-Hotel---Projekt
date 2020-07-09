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
            currentUser: undefined,
            renderNotifications: false,
            renderStorage: false,
            renderWorkers: false,
            renderReservations: false,
            renderRooms: false,
            renderServices: false,
        };

    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
            });

            if (user.roles.includes("ROLE_MANAGER")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderWorkers:          true,
                    renderReservations:     true,
                    renderRooms:            true,
                    renderServices:         true
                });
            }

            if (user.roles.includes("ROLE_RECEPTIONIST")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderReservations:     true,
                    renderRooms:            true,
                    renderServices:         true
                });
            }
            if (user.roles.includes("ROLE_ACCOUNTANT")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderWorkers:          true,
                    renderReservations:     true,
                    renderRooms:            true,
                });
            }
            if (user.roles.includes("ROLE_CLEANER")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderRooms:            true,
                });
            }
            if (user.roles.includes("ROLE_KITCHEN_MANAGER")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderRooms:            true,
                    renderServices:         true
                });
            }
            if (user.roles.includes("ROLE_BUTLER")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderRooms:            true,
                    renderServices:         true
                });
            }
            if (user.roles.includes("ROLE_REPAIRMAN")) {
                this.setState({
                    renderNotifications:    true,
                    renderStorage:          true,
                    renderRooms:            true,
                });
            }
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
                        {/* <NavbarBrand href="/home">Strona Główna</NavbarBrand> */}
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                {currentUser && this.state.renderNotifications && (
                                    <NavItem>
                                        <NavLink href="/notifications">Powiadomienia</NavLink>
                                    </NavItem>
                                )}
                                {currentUser && this.state.renderStorage && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Magazyn Przedmiotów
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={event => window.location.href = '/itemstorage'}>
                                                Stany magazynowe
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/orders'}>
                                                Zamówienia
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                                {currentUser && this.state.renderWorkers && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Pracownicy
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={event => window.location.href = '/workers'}>
                                                Lista pracowników
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/addworker'}>
                                                Dodaj pracownika
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                                {currentUser && this.state.renderReservations && (
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
                                {currentUser && this.state.renderRooms && (
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Pokoje
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={event => window.location.href = '/rooms'}  >
                                                Wszystkie Pokoje
                                            </DropdownItem>
                                            <DropdownItem onClick={event => window.location.href = '/cleaning'} >
                                                Sprzątanie
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )}
                                {currentUser && this.state.renderServices && (
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
                                    <NavItem nav inNavbar>
                                        <NavLink nav caret>
                                            {currentUser.username}
                                        </NavLink>
                                    </NavItem>
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
                                            Zaloguj się
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