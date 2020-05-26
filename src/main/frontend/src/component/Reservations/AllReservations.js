import React, {Component} from "react";
import ReservationService from "../../service/ReservationService";
import '../LoginPage.css';

const required = value => {
    if (!value) {
        return (
            <div className="my-alert">
                This field is required!
            </div>
        );
    }
};

export default class AllReservations extends Component{
    constructor(props) {
        super(props);

        this.state = {
            allReservations: [],
            message: "",
            success : false,
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
        });
    }

    render() {
        return (
            <h1>Pustka! --- InProgress :D</h1>
        );

    }

}