import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import '../Login/LoginPage.css';
import './Reservation.css'
import {toast} from "react-toastify";
import Reservation from "./Reservation";
import DatePicker from "react-date-picker";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Collapse, CardBody, Card, 
        Input, InputGroup, InputGroupAddon, InputGroupText, Spinner} from 'reactstrap';


export default class AllReservations extends Component{
    constructor(props) {
        super(props);

        this.state = {
            allReservations: [],
            toastId : null,
            filterReservationModal: false,
            firstNameRegex: "",
            lastNameRegex: "",
            filterByDate: false,
            filterByDateModal: false,
            minDate: new Date(),
            checkInDate:  new Date(),
            checkOutDate: new Date(),
            loading: true
        }

        this.handleSearchByFirstName = this.handleSearchByFirstName.bind(this);
        this.handleSearchByLastName = this.handleSearchByLastName.bind(this);
        this.handleSearchByDate = this.handleSearchByDate.bind(this);
        this.resetSearchByDate = this.resetSearchByDate.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    handleSearchByFirstName(event) {
        this.setState({ 
            firstNameRegex: event.target.value
         });
    }

    handleSearchByLastName(event) {
        this.setState({ 
            lastNameRegex: event.target.value
        });
    }

    handleSearchByDate() {
        this.setState( {
            filterByDateModal: !this.state.filterByDateModal,
            filterByDate: true 
        });
    }

    resetSearchByDate() {
        this.setState({
            filterByDateModal: !this.state.filterByDateModal,
            filterByDate: false
        });
    }

    resetFilters() {
        this.setState({
            firstNameRegex: "",
            lastNameRegex: "",
            filterByDate: false,
            checkInDate:  new Date(),
            checkOutDate: new Date(),
        })
    }


    componentDidMount() {
        ReservationService.getAllReservations().then(
            response => {
                this.setState({
                    allReservations: response.data,
                    loading: false
                });
            }).catch(error => {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            if (!toast.isActive(this.state.toastId)) {
                this.setState({
                    toastId: toast.error("Error: " + resMessage, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: false
                    })
                })
            }
        });
    }

    render() {
        const {allReservations, firstNameRegex, lastNameRegex, checkInDate, 
            checkOutDate, filterByDate, filterByDateModal, filterReservationModal } = this.state;
        
        let filtredReservations = allReservations.filter(reservation => {
            if( ["*","?","+"].includes(firstNameRegex) ) {
                return null;
            }
            return reservation.firstName.match(firstNameRegex);
        }).filter(reservation => {
            if( ["*","?","+"].includes(lastNameRegex) ) {
                return null;
            }
            return reservation.lastName.match(lastNameRegex);
        }).filter(reservation => {
            if(filterByDate === true) {
                return reservation.startDate.match(checkInDate.getFullYear()+"-"+("0"+(checkInDate.getMonth()+1)).slice(-2)+"-"+checkInDate.getDate());
            } else {
                return true;
            }
        }).filter(reservation => {
            if(filterByDate === true) {
                return reservation.endDate.match(checkOutDate.getFullYear()+"-"+("0"+(checkOutDate.getMonth()+1)).slice(-2)+"-"+checkOutDate.getDate());
            } else {
                return true;
            }
        }).map((reservation, index) => {
            return <Reservation key={index} {...reservation} />
        });

        return (
            <div>
                {this.state.loading && <Spinner animation="border"/>}
                <div className="allreservations-header">
                    LISTA REZERWACJI
                </div> 
                <div>
                    <Button style={{backgroundColor: '#f99cab'}} onClick={() => { this.setState( {filterReservationModal: !filterReservationModal })}}>
                        Filtruj rezerwacje
                    </Button>
                    <Collapse isOpen={filterReservationModal}>
                        <Card>
                            <CardBody>
                                <div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Imię</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="inputFirstName"  value={firstNameRegex} onChange={this.handleSearchByFirstName}/>
                                    </InputGroup>
                                    <br/>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Nazwisko:</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="inputLastName" value={lastNameRegex} onChange={this.handleSearchByLastName}/>
                                    </InputGroup>          
                                    <br/>
                                    <Button style={{backgroundColor: '#f99cab'}} onClick={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>
                                        Filtruj po dacie
                                    </Button>
                                    {'  '}
                                    <Button color="danger" onClick={this.resetFilters}>
                                        Resetuj filtry
                                    </Button>

                                    <Modal isOpen={filterByDateModal} toggle={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>
                                        <ModalHeader toggle={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>Wybierz daty</ModalHeader>
                                        <ModalBody>
                                            <div>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>Od</InputGroupText>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        dateFormat='yyyy-MM-dd'
                                                        value={checkInDate}    
                                                        selected={checkInDate}
                                                        onChange={val => this.setState({
                                                            checkInDate: new Date(val),
                                                            checkOutDate: new Date(val)
                                                        })}
                                                    />
                                                </InputGroup>
                                                <br/>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>Do</InputGroupText>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        dateFormat='yyyy-MM-dd'
                                                        value={checkOutDate}
                                                        selected={checkOutDate}
                                                        minDate={checkInDate}
                                                        onChange={val => this.setState({
                                                            checkOutDate: new Date(val)
                                                        })}    
                                                    />
                                                </InputGroup>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="success" onClick={this.handleSearchByDate}>
                                                Zatwierdź
                                            </Button>
                                            {'  '}
                                            <Button color="danger" onClick={this.resetSearchByDate}>
                                                Resetuj daty
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                <div className="allreservations-container">
                    {filtredReservations}
                </div>

            </div>
        );
    }

}