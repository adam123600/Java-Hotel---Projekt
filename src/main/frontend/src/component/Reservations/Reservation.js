import React, { Component } from "react";

import '../Login/LoginPage.css';
import './Reservation.css'
import AuthService from "../../service/AuthService";
import AddGuest from "../Guests/AddGuest";
import Modal from "reactstrap/es/Modal";

export default class Reservation extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            reservationId: 0,
            firstName: "",
            lastName: "",
            room: {},
            startDate: 0,
            endDate:  0,
            toastId : null,
            modal: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                reservationId: this.props.id,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                room: this.props.room,
                startDate: this.props.startDate,
                endDate: this.props.endDate,
            });
        }
    }

    onButtonClick = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    render() {
        return (
            <div className="allreservations-reservation">
                <h5 className="my-label"><span className="allreservations-label">Imię: </span>{this.props.firstName}</h5>
                <h5 className="my-label"><span className="allreservations-label">Nazwisko: </span>{this.props.lastName}</h5>
                <h5 className="my-label"><span className="allreservations-label">Numer pokoju: </span>{this.props.room.roomName}</h5>
                <h5 className="my-label"><span className="allreservations-label">Standard pokoju: </span>{this.props.room.roomStandard.name}</h5>
                <h5 className="my-label"><span className="allreservations-label">Początek rezerwacji: </span><span className="allreservations-startdate">{this.props.startDate}</span></h5>
                <h5 className="my-label"><span className="allreservations-label">Koniec rezerwacji: </span><span className="allreservations-enddate">{this.props.endDate}</span></h5>
                <button className="my-button login-button" onClick={this.onButtonClick}>Zamelduj</button>
                <Modal isOpen={this.state.modal} toggle={this.onButtonClick}>
                    <AddGuest reservation={this.props}/>
                </Modal>
            </div>
        )
    }
}