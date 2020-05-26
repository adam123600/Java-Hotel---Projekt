import React, { Component } from "react";

import '../Login/LoginPage.css';
import './Reservation.css'
import AuthService from "../../service/AuthService";
import AddGuest from "../Guests/AddGuest";

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

    };

    render() {
        return (
            <div className="reservation-form">
                <h5 className="my-label">Imię: {this.props.firstName}</h5>
                <h5 className="my-label">Nazwisko: {this.props.lastName}</h5>
                <h5 className="my-label">Numer pokoju: {this.props.room.roomName}</h5>
                <h5 className="my-label">Standard pokoju: {this.props.room.roomStandard.name}</h5>
                <h5 className="my-label">Początek rezerwacji: {this.props.startDate}</h5>
                <h5 className="my-label">Koniec rezerwacji: {this.props.endDate}</h5>
                <button className="my-button login-button" onClick={this.onButtonClick}>Zamelduj</button>
            </div>
        )
    }
}