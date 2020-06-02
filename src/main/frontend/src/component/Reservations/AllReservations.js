import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import '../Login/LoginPage.css';
import './Reservation.css'
import {toast} from "react-toastify";
import Reservation from "./Reservation";
import DatePicker from "react-date-picker";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


export default class AllReservations extends Component{
    constructor(props) {
        super(props);

        this.state = {
            allReservations: [],
            toastId : null,
            firstNameRegex: "",
            lastNameRegex: "",
            filterByDate: false,
            filterByDateModal: false,
            minDate: new Date(),
            checkInDate:  new Date(),
            checkOutDate: new Date(),
        }

        this.handleSearchByFirstName = this.handleSearchByFirstName.bind(this);
        this.handleSearchByLastName = this.handleSearchByLastName.bind(this);
        this.handleSearchByDate = this.handleSearchByDate.bind(this);
        this.resetSearchByDate = this.resetSearchByDate.bind(this);
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


    componentDidMount() {
        ReservationService.getAllReservations().then(
            response => {
                this.setState({
                    allReservations: response.data
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
        const {allReservations, firstNameRegex, lastNameRegex, checkInDate, minDate,
            checkOutDate, filterByDate, filterByDateModal } = this.state;
        
        let filtredReservations = allReservations.filter(reservation => {
            return reservation.firstName.match(firstNameRegex);
        }).filter(reservation => {
            return reservation.lastName.match(lastNameRegex);
        }).filter(reservation => {
            if(filterByDate == true) {
                return reservation.startDate.match(checkInDate.getFullYear()+"-"+("0"+(checkInDate.getMonth()+1)).slice(-2)+"-"+checkInDate.getDate());
            } else {
                return true;
            }
        }).filter(reservation => {
            if(filterByDate == true) {
                return reservation.endDate.match(checkOutDate.getFullYear()+"-"+("0"+(checkOutDate.getMonth()+1)).slice(-2)+"-"+checkOutDate.getDate());
            } else {
                return true;
            }
        }).map((reservation, index) => {
            return <Reservation key={index} {...reservation} />
        });

        return (
            <div>
                <div className="allreservations-header">
                    LISTA REZERWACJI
                </div>
                <label style={{padding: '5px 12px 5px'}}>Filtruj rezerwacje:</label>

                <label style={{padding: '5px 12px 5px'}}>Imię:</label>
                <input type="text" name="inputFirstName"  value={firstNameRegex} onChange={this.handleSearchByFirstName}/>

                <label style={{padding: '5px 12px 5px'}}>Nazwisko:</label>
                <input type="text" name="inputLastame" value={lastNameRegex} onChange={this.handleSearchByLastName}/>

                <Button style={{backgroundColor: '#f99cab'}} onClick={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>
                    Filtruj po dacie
                </Button>

                <Modal isOpen={filterByDateModal} toggle={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>
                    <ModalHeader toggle={() => { this.setState( {filterByDateModal: !filterByDateModal })}}>Wybierz daty</ModalHeader>
                    <ModalBody>
                           <label style={{padding: '5px 12px 5px 30px'}}>Szukaj od:</label>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                value={checkInDate}    
                                selected={checkInDate}
                                onChange={val => this.setState({
                                    checkInDate: new Date(val),
                                    checkOutDate: new Date(val)
                                })}
                            />
                        <label style={{padding: '5px 12px 5px 30px'}}>Szukaj do:</label>
                            <DatePicker
                                dateFormat='yyyy-MM-dd'
                                value={checkOutDate}
                                selected={checkOutDate}
                                minDate={checkInDate}
                                onChange={val => this.setState({
                                    checkOutDate: new Date(val),
                                })}    
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor: '#f99cab'}} onClick={this.handleSearchByDate}>
                            Zatwierdź
                        </Button>
                        <Button color="danger" onClick={this.resetSearchByDate}>
                            Resetuj daty
                        </Button>
                    </ModalFooter>
                </Modal>

                <div className="allreservations-container">
                    {filtredReservations}
                </div>

            </div>
        );
    }

}