import React, { Component } from "react";
import GuestService from "../../service/GuestService";
import GuestDetails from "./GuestDetails";
import {Link, NavLink} from "react-router-dom";
import { Button } from "reactstrap";

export  default class Guest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            guestID: this.props.guest.id,
            renderDetails: false
        }

        this.renderDetails = this.renderDetails.bind(this);
    }

    renderDetails() {
        this.setState({renderDetails: !this.state.renderDetails});
    }


    render() {
        return (
            <div style={{padding: '25px'}}>
                <h5>Imię: {this.props.guest.firstName} <br/>
                    Nazwisko: {this.props.guest.lastName}</h5>
                <Link to={{
                    pathname:`/guests/${this.state.guestID}`,
                    props:{guest: this.props.guest}
                            }}>
                    <Button style={{backgroundColor: '#f99cab'}}>Szczegółowe dane</Button>
                </Link>
            </div>
        )
    }
}