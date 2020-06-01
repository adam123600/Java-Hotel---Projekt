import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import '../Login/LoginPage.css';
import './Reservation.css'
import {toast} from "react-toastify";
import Reservation from "./Reservation";


export default class AllReservations extends Component{
    constructor(props) {
        super(props);

        this.state = {
            allReservations: [],
            toastId : null,
        }

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
        return (
        <div>
            <div className="allreservations-header">
                LISTA REZERWACJI
            </div>
            <div className="allreservations-container">
                {this.state.allReservations.map((reservation, index) => {
                    return <Reservation key={index} {...reservation} />
                })}
            </div>
        </div>
        );
    }

}